import { AxiosHttpClient } from './AxiosHttpClient';

export class AxiosHttpClientFactory {
  createInstance(baseUrl: string) {
    return new AxiosHttpClient(baseUrl);
  }
}