import type { IHttpClient, IRequestOptions, IRequestResult } from 'ddd-library-client';
import axios, { AxiosInstance } from 'axios';

export class AxiosHttpClient implements IHttpClient {
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl
    });
  }

  async get<TResult, TData = any>(url: string, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>> {
    const response = await this.instance.get<TResult>(url, {
      headers: options?.headers,
      params: options?.params
    });

    return {
      data: response.data
    };
  }

  async post<TResult, TData = any>(url: string, data: TData, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>> {
    const response = await this.instance.post<TResult>(url, data, {
      headers: options?.headers,
      params: options?.params
    });

    return {
      data: response.data
    };
  }

  async put<TResult, TData = any>(url: string, data: TData, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>> {
    const response = await this.instance.put<TResult>(url, data, {
      headers: options?.headers,
      params: options?.params
    });

    return {
      data: response.data
    };
  }

  async delete<TResult, TData = any>(url: string, options?: IRequestOptions<TData>): Promise<IRequestResult<TResult>> {
    const response = await this.instance.delete<TResult>(url, {
      headers: options?.headers,
      params: options?.params
    });

    return {
      data: response.data
    };
  }
}