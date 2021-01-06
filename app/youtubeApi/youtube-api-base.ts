import {ErrorResponse, ErrorResponseException} from './youtube-api-models';

export class Base {
  baseUri: string = 'https://youtube.googleapis.com/youtube/v3/';
  token: string;
  uriExtension: string;
  constructor(token: string, uriExtension: string) {
    this.token = token;
    this.uriExtension = uriExtension;
  }

  buildUri(parameters: object): string {
    let paramUri = '';
    for (let [key, value] of Object.entries(parameters)) {
      if (value) {
        paramUri += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
      }
    }

    // remove last '&'
    if (paramUri !== '') {
      paramUri = '?' + paramUri.slice(0, -1);
    }

    return this.baseUri + this.uriExtension + paramUri;
  }

  requestInit(method: string): RequestInit {
    return {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      method: method,
    };
  }

  async getWebRequest<T>(uri: string): Promise<T> | never {
    const response = await fetch(uri, this.requestInit('get'));

    if (!response.ok) {
      let errorResponse = (await response.json()) as ErrorResponse;
      throw new ErrorResponseException(errorResponse);
    }

    return (await response.json()) as T;
  }

  async postWebRequest<T>(uri: string): Promise<T> | never {
    const response = await fetch(uri, this.requestInit('post'));

    if (!response.ok) {
      let errorResponse = (await response.json()) as ErrorResponse;
      throw new ErrorResponseException(errorResponse);
    }

    return (await response.json()) as T;
  }

  async deleteWebRequest<T>(uri: string): Promise<T> | never {
    const response = await fetch(uri, this.requestInit('delete'));

    if (!response.ok) {
      let errorResponse = (await response.json()) as ErrorResponse;
      throw new ErrorResponseException(errorResponse);
    }

    return (await response.json()) as T;
  }
}
