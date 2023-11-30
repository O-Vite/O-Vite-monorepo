import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './exceptions/custom-global-exception';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT_BACKEND || 3000, '0.0.0.0');
}
bootstrap();
