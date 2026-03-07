import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (
                typeof exceptionResponse === 'object' &&
                exceptionResponse !== null &&
                'message' in exceptionResponse
            ) {
            const msg = (exceptionResponse as Record<string, unknown>).message;
            message = Array.isArray(msg) ? (msg as string[]).join(', ') : String(msg);
            }
        }

    const body: ApiResponse<null> = {
        success: false,
        message,
        data: null,
    };

    response.status(status).json(body);
    }
}