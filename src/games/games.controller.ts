import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { gameImageStorage } from '../config/multer.config'; //configuracion de multer

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: gameImageStorage,
    }),
  )
  create(
    @Body() body: { title?: string; color?: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file ? `/games/${file.filename}` : undefined;

    return this.gamesService.create({
      title: body.title,
      color: body.color,
      imageUrl,
    });
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  // UPDATE COMPLETO (PUT)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: gameImageStorage,
    }),
  )
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; color?: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file ? `/games/${file.filename}` : undefined;

    return this.gamesService.update(id, {
      title: body.title,
      color: body.color,
      ...(imageUrl && { imageUrl }),
    });
  }

  // UPDATE PARCIAL (PATCH)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: gameImageStorage,
    }),
  )
  patch(
    @Param('id') id: string,
    @Body() body: { title?: string; color?: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file ? `/games/${file.filename}` : undefined;

    return this.gamesService.update(id, {
      ...body,
      ...(imageUrl && { imageUrl }),
    });
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }

  /*
  @Post()
  create(@Body() body: any) {
    return this.gamesService.create(body);
  }
  */
  //prueba para almacenar imagenes
  /*
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: gameImageStorage,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      imageUrl: `/uploads/games/${file.filename}`,
    };
  }
  */
}
