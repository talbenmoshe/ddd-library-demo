import { IHttpClient, IRequestOptions, IRequestResult } from '../src';
import { vi } from 'vitest';

export interface IHttpInitialData<TResponse> {
  getResponse: TResponse;
  postResponse: TResponse;
  putResponse: TResponse;
  deleteResponse: TResponse;
}

export class FakeHttpClient<TResponse = any> implements IHttpClient {
  constructor(private initialData: IHttpInitialData<TResponse>) {

  }

  get = vi.fn<(url: string, options?: IRequestOptions<any>) => Promise<IRequestResult<any>>>(
    () => Promise.resolve({ data: this.initialData.getResponse })
  );
  post = vi.fn<(url: string, data: any, options?: IRequestOptions<any>) => Promise<IRequestResult<any>>>(
    () => Promise.resolve({ data: this.initialData.postResponse })
  );
  put = vi.fn<(url: string, data: any, options?: IRequestOptions<any>) => Promise<IRequestResult<any>>>(
    () => Promise.resolve({ data: this.initialData.putResponse })
  );
  delete = vi.fn<(url: string, options?: IRequestOptions<any>) => Promise<IRequestResult<any>>>(
    () => Promise.resolve({ data: this.initialData.deleteResponse })
  );
}

export class FakeHttpClientBuilder {
  build() {
    return new FakeHttpClient({
      getResponse: {},
      postResponse: {},
      putResponse: {},
      deleteResponse: {}
    });
  }
}