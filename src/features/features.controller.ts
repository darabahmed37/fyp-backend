import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FeaturesService } from 'features/features.service';
import { CreateServiceDTO } from 'features/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { Public } from 'utils/custom.decorator';

@Controller('services')
export class FeaturesController {
  constructor(private featureService: FeaturesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  newService(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateServiceDTO,
  ) {
    return this.featureService.createService({
      ...req.body,
      image: file.filename,
    });
  }

  @Get()
  async getAllService() {
    const data = await this.featureService.getAllServices();

    return data;
  }

  @Public()
  @Get(':image')
  getImage(@Param('image') image: string, @Res() response: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', image);
    return response.sendFile(filePath);
  }
}
