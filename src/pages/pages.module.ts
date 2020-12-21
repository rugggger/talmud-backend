import { Module } from '@nestjs/common';
import { MishnaController } from './mishna.controller';
import { PagesService } from './pages.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  MishnaSchema } from './schemas/mishna.schema';
import { Tractate, TractateSchema } from './schemas/tractate.schema';
import { ConsoleModule } from 'nestjs-console';
import { Mishna } from './schemas/mishna.schema';
import { TractateRepository } from './tractate.repository';
import { MishnaRepository } from './mishna.repository';
import { EditMishnaController } from './edit.mishna.controller';
import { EditMishnaExcerptController } from './edit.excerpt.controller';
import { SettingsModule } from 'src/settings/settings.module';
import { TractatesController } from './tractates/tractates.controller';
import { SublineService } from './subline.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tractate.name, schema: TractateSchema },
      { name: Mishna.name, schema: MishnaSchema }

    ]),
    ConsoleModule,
    SettingsModule
  ],
  controllers: [
    TractatesController,
    MishnaController, EditMishnaController, EditMishnaExcerptController],
  providers: [
    PagesService,
    SublineService,
    TractateRepository,
    MishnaRepository,
  ],
  exports: [PagesService, SublineService, TractateRepository,MishnaRepository]
})
export class PagesModule {}
