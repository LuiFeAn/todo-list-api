import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { NotFoundDomainError } from '@domain/@shared/errors/not-found/not-found.errors';

@Catch(NotFoundDomainError)
export class NotFoundDomainErrorProxyFilter implements ExceptionFilter {
  catch(exception: QueryFailedError & { errno: number }, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    return response.status(HttpStatus.NOT_FOUND).json({
      message: exception.message,
      error: 'Algo deu errado',
      statusCode: 400,
    });
  }
}
