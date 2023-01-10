import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import PrismaService from '@modules/prisma/prisma.service';
import { AppModule } from './app.module';
import * as Compression from 'compression';
import Helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const appOptions = {
  cors: {
    maxAge: 3600,
    origin: ['*'],
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  const prismaService = app.get(PrismaService);
  const config = new DocumentBuilder()
    .setTitle('Customers API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(Compression());
  app.use(Helmet());
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('api', app, document);

  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
