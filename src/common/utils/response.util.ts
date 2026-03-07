import { ApiResponse } from '../interfaces/api-response.interface';

export function successResponse<T>(message: string, data: T): ApiResponse<T> {
    return { success: true, message, data };
}

export function errorResponse(message: string): ApiResponse<null> {
    return { success: false, message, data: null };
}

// จะได้ไม่ต้องพิมพ์ { success: true, ... } ซ้ำทุกendpoint