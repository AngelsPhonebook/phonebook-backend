import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Все ресурсы бекенда живут под /api (nginx: /phonebook/api/ -> бекенду на /api/).
  // Без этого контроллер contacts был на /contacts, и через nginx до него не добраться —
  // /phonebook/contacts попадал во фронтенд (SPA), а не в API.
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Телефонная книга')
    .setDescription('Бекенд-сервис для телефонной книги')
    .setVersion('1.0')
    .addServer(process.env.SWAGGER_BASE_URL ?? '/')
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
