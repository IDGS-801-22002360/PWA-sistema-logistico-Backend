import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000', //* Local
      'http://localhost:4200', //* React Local
      'http://localhost:5173',
      'https://crmlogistico-gqembuffawgdfudk.canadacentral-01.azurewebsites.net',
      'https://pwa-l4rb2njva-idgs-801-22002360s-projects.vercel.app',
      process.env.API_BASE_URL,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
