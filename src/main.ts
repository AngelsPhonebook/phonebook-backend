import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Телефонная книга')
    .setDescription('Бекенд-сервис для телефонной книги')
    .setVersion('1.0')
    // Базовый сервер Swagger. В проде бекенд живут по под-пути /phonebook/, поэтому в серверном
    // .env задан SWAGGER_BASE_URL=/phonebook (иначе "Try it out" слал бы запросы на /contacts ->
    // на магазин, а не на справочник). Локально переменной нет -> '/', Swagger ходит от корня.
    .setBasePath(process.env.SWAGGER_BASE_URL ?? '/')
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const host = process.env.BACKEND_HOST
    ? String(process.env.BACKEND_HOST)
    : 'localhost';

  await app.listen(port, host, () => console.info(`http://${host}:${port}/api`));
}
bootstrap();
