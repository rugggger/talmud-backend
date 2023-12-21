import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportModule } from './import/import.module';
import { SettingsModule } from './settings/settings.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION,
      {}),
    PagesModule,
    ImportModule,
    SettingsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
