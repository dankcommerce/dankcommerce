import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import * as getPackage from 'package';

async function bootstrap() {
  const logger = new Logger('boostrap');

  logger.log('Starting bootstrapping');
  const app = await NestFactory.create(ApplicationModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    logger.log('Cors enabled');
  }

  const { version } = getPackage(module);
  const { path, title, description } = config.get('explorer');
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(path, app, document);
  logger.log(`BigCommerce explorer start on path: /${path}`);

  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`BigCommerce start on port: ${port}`);
}
bootstrap();
