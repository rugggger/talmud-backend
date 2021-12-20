import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { PagesService } from '../pages/pages.service';
import { TractateRepository } from 'src/pages/tractate.repository';
import { MishnaRepository } from 'src/pages/mishna.repository';
import { CsvParser } from 'nest-csv-parser';
import { SettingsService } from 'src/settings/settings.service';
import * as fs from 'fs';
import { SublineService } from 'src/pages/subline.service';
import { Mishna } from 'src/pages/schemas/mishna.schema';

class Entity {

}
@Console()
@Injectable()
export class ListService {
  constructor(
    private readonly csvParser: CsvParser,
    private pageService: PagesService,
    private tractateRepo: TractateRepository,
    private mishnaRepo: MishnaRepository,
    private settingsService: SettingsService,
    private sublineService: SublineService,
  ) {}


  @Command({
    command: 'list:empty-links',
    description: 'List empty links',
  })
  async listEmptyLinks(): Promise<void> {
    const filename = './excerpts.csv/excerpts5_full.csv';
    const stream = fs.createReadStream(filename);
    const sources = await this.csvParser.parse(
      stream,
      Entity,
      null,
      null,
      { strict: true, separator: ',' },
    );
    const compositions = await this.settingsService.getSettings('compositions');
    console.log('list empty links')
    const checkLinks = async (m: Mishna): Promise<void> => {
      const emptyLinks = m?.excerpts.filter(e=> e.type!=='NOSACH' &&  (e.source === undefined ||
         e.source.title === undefined));
      emptyLinks.forEach(emptyLink => {
        console.log('missing: ', emptyLink.sourceLocation)
        const text = emptyLink.editorStateFullQuote.blocks[0].text
        const find = sources.list.find(s => {
         return s.excerpt === text
        });
        if (find) {
          const compo = compositions.find(c => c.title === find.composition);
          console.log(compo)
          if (compo) {
            emptyLink.source = compo;
            console.log('fixed: ',emptyLink)
          }
        }
      })
      m.markModified('excerpts')
      await m.save();
      return Promise.resolve()
    }
    await this.mishnaRepo.forEachMishna(checkLinks)
  }


}
