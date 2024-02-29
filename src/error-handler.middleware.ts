import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class ErrorHandlerMiddleware implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.error(error); // Log the error to the console
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message || '*',
    });
  }
}
