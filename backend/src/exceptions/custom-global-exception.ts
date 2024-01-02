import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException, Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return (
      response
        //@ts-ignore
        .status(
          exception instanceof HttpException ? exception.getStatus() : 500,
        )
        .send({
          message: exception.message,
        })
    );
  }
}
