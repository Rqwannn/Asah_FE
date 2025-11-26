export interface ApiResponseDTO<T> {
    status: string;
    message: string;
    data: T;
}
