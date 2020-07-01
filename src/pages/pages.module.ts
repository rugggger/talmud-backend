import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  MishnaSchema } from './schemas/mishna.schema';
import { Tractate, TractateSchema } from './schemas/tractate.schema';
import { ConsoleModule } from 'nestjs-console';
import { Mishna } from './schemas/mishna.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tractate.name, schema: TractateSchema },
      { name: Mishna.name, schema: MishnaSchema }

    ]),
    ConsoleModule
  ],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService]
})
export class PagesModule {}
