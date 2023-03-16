/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Param, Post } from '@nestjs/common';
import { LineService } from './line.service';
import { MishnaRepository } from './mishna.repository';

@Controller('actions/mishna')
export class ActionsMishnaController {
  constructor(
    private mishnaModel: MishnaRepository,
    private lineService: LineService,
  ) {}

  @Post('sync_parallels/:tractate/:chapter/:mishna/:line')
  async syncParallels(
    @Param('tractate') tractate: string,
    @Param('chapter') chapter: string,
    @Param('mishna') mishna: string,
    @Param('line') line: string,
  ) {
    const mishnaDoc = await this.mishnaModel.find(tractate, chapter, mishna);
    await this.lineService.updateLineParallels(mishnaDoc, line);
    mishnaDoc.markModified('lines');
    await mishnaDoc.save();

    return {
      //@ts-ignore
      ...mishnaDoc._doc,
    };
  }
}
