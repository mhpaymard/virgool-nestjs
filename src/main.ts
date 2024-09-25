import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerConfigInit } from './config/swagger.config';
import * as CookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfigInit(app);
  app.use(CookieParser(process.env.COOKIE_SECRET))
  const {PORT} = process.env;
  await app.listen(PORT,()=>{
    console.log(`Server Is Running -> http://localhost:${PORT}`);
    console.log(`http://localhost:${PORT}/swagger`);
  });
}
bootstrap();