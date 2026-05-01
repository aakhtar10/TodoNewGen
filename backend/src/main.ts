import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.enableCors({
    origin: ["http://localhost:3001","http://localhost:3000","https://todo-new-gen.vercel.app/"], // your Next.js app
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('New GEN TODO')
    .setDescription('API documentation for newGenTodo backend')
    .setVersion('1.0')
    .addBearerAuth() // for JWT (optional)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document); 
  // URL → http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();