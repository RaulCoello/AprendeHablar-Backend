import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo.module'; // Import the MongoModule
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { QuestionsModule } from './questions/questions.module';
// para servir archivos staticos
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// los imports de los modulos se hacen automaticamente cuando se ejecutan los comandos de creacion
@Module({
  imports: [
    MongoModule,
    UsersModule,
    GamesModule,
    QuestionsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), //para servir archivos estaticos
      serveRoot: '/resources',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
