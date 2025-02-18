import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';
import { MyLoggerService } from './my-logger/my-logger.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs:true,
  })
  const logger = app.get(MyLoggerService); // Get your logger service instance
  app.useLogger(logger);
  const {httpAdapter} =app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  
  app.enableCors({
    origin: 'http://localhost:3002',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
  logger.log('Backend is running on http://localhost:3001');
}
bootstrap();