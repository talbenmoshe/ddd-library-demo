import type { RawAxiosRequestHeaders } from 'axios';

export interface IRequestOptions<TData> {
    headers?: RawAxiosRequestHeaders;
    data?: TData;
    params?: any;
}

export interface IRequestResult<T> {
    data: T;
}

export interface IHttpClient {
    get<TResult, TData = any>(url: string, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>>;
    post<TResult, TData = any>(url: string, data: TData, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>>;
    put<TResult, TData = any>(url: string, data: TData, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>>;
    delete<TResult, TData = any>(url: string, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>>;
}