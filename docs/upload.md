<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# File upload

[Back to docs](./index.md)

### Basic file upload

- Import ```MulterModule``` in Module
  ```js
  // src/modules/good/good.module.ts
  import { Module } from '@nestjs/common';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { MulterModule } from '@nestjs/platform-express';
  import { extname } from 'path';
  import { existsSync, mkdirSync } from 'fs';
  import { diskStorage } from 'multer';
  import { Good } from './entities/good.entity';
  import { snakeCase, uuid } from '../../core/utils/helpers';

  const entity = snakeCase(Good.name);

  @Module({
    imports: [
      ...
      MulterModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          // use diskStorage to store files locally
          // files will be uploaded to path specified as cdnPath in config
          storage: diskStorage({
            destination: function (req, file, cb) {
              const uploadPath = configService.get('cdnPath') + '/' + entity;
              existsSync(uploadPath) || mkdirSync(uploadPath);
              cb(null, uploadPath);
            },
            filename: function (req, file, cb) {
              const ext = extname(file.originalname);
              cb(null, `${Date.now()}-${uuid()}${ext}`); // file name to save
            },
          }),
        }),
        inject: [ConfigService],
      }),
    ],
    ...
  })
  export class GoodModule {}
  ```
- Define dto for upload API
  ```js
  // src/modules/good/dto/upload-good.dto.ts
  export class UploadGoodDto {
    @ApiProperty({
      type: 'string',
      format: 'binary',
      description: 'Good image file',
    })
    image_file: any;
  }
  ```
- Define route in controller
  ```js
  // src/modules/good/good.controller.ts
  /**
   * Upload
   */
  @Post('upload')
  ...
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_file'))
  async upload(
    ...
    @Body() uploadGoodDto: UploadGoodDto, // Other body parameters
    @UploadedFile() imageFile: Express.Multer.File, // Uploaded file
  ) {
    ...
  }
  ```
- Save image path using create/update function
  ```js
  job.body.image = imageFile.filename;
  ```
- Add image URL as a VIRTUAL field
  ```js
  // src/modules/good/entities/good.entity.ts
  import config from '../../../config';

  @Table
  export class Good extends Entity<Good> {
    ...
    @Column
    @ApiProperty({
      description: 'Image',
      example: 'good/sample.png',
    })
    @IsOptional()
    @IsString()
    image?: string;

    @Column(DataType.VIRTUAL)
    @ApiProperty({
      description: 'Image URL',
      example: 'http://localhost:3001/cdn/good/sample.png',
      readOnly: true,
    })
    get image_url(): string {
      return config().cdnURL + this.getDataValue('image');
    }
    ...
  }
  ```
### Upload and update body
- By using our custom file upload decorator, we can upload the file and set the filename to body object directly
  ```js
  import { FileUploads } from '../../core/utils/decorators';

  ...
  @FileUploads([
    { name: 'image_file', required: true, bodyField: 'image' },
    { name: 'license_file', required: true, bodyField: 'license' },
  ])
  // By setting required option to TRUE, request will throw BadRequestException if no file is uploaded
  // use bodyField option to set the filename to body[bodyField]
  ...
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createTicketChatDto: CreateTicketChatDto,
  ) {
    console.log(createTicketChatDto);
    // { ..., image: 'images/avatar.png', license: 'licenses/sample.pdf' }
  }

- Bind multiple properties
  ```js
  @FileUploads([
    {
      name: 'file',
      bodyField: { file: 'key', file_type: 'mimetype' },
    },
  ])
  // { ..., file: 'images/avatar.png', file_type: 'image/png' }
  ```
### Upload to S3 bucket

- Configure AWS and S3 in .env
  ```bash
  ## APP
  ...
  CDN_URL=https://<BUCKET_NAME>.s3.amazonaws.com/

  ## AWS
  AWS_USE_SHARED_CREDENTIAL=Y
  AWS_PROFILE=
  AWS_REGION=
  AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY=
  AWS_S3_BUCKET=<BUCKET_NAME>
  ```
- Import ```AwsModule``` in ```AppModule```
  ````js
  // src/app.module.ts
  @Module({
    imports: [
      ...
      AwsModule,
      ...
    ],
    ...
  })
  export class AppModule {}
  ````
- Configure ```MulterModule``` for S3 upload
  ```bash
  # install multer for s3
  $ npm i --save multer-s3
  $ npm i --save-dev @types/multer-s3
  ```
  ````js
  // src/modules/good/good.module.ts
  import * as multerS3 from 'multer-s3';
  import { S3Module } from '../../core/modules/aws/s3/s3.module';
  import { S3Service } from '../../core/modules/aws/s3/s3.service';

  @Module({
    imports: [
      ...
      MulterModule.registerAsync({
        imports: [ConfigModule, S3Module],
        useFactory: async (
          configService: ConfigService,
          s3Service: S3Service,
        ) => {
          return {
            storage: multerS3({
              s3: s3Service.s3,
              bucket: configService.get('s3').params.Bucket,
              acl: 'public-read', // optional
              key: function (req, file, cb) {
                const ext = extname(file.originalname);
                cb(null, `${entity}/${Date.now()}-${uuid()}${ext}`); // key name to save
              },
              contentType: function (req, file, cb) {
                cb(null, file.mimetype);
              },
            }),
          };
        },
        inject: [ConfigService, S3Service],
      }),
    ],
    ...
  })
  export class GoodModule {}
  ````
- Save S3 key using create/update function
  ```js
  job.body.image = imageFile.key;
  ```


### References
- <a target="_blank" href="https://github.com/expressjs/multer">Multer</a>
- <a target="_blank" href="https://github.com/badunk/multer-s3">Multer S3</a>
- <a target="_blank" href="https://docs.nestjs.com/techniques/file-upload">Nest JS file upload</a>