// กำหนดรูปแบบ response ที่ทุก endpoint

export interface ApiResponse<T> { 
    success: boolean;
    message: string;
    data: T | null;
}