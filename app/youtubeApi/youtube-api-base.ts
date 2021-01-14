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

  requestInit(method: string, body?: any): RequestInit {
    return {
      headers: {
        'Content-Type': "application/json",
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
      method: method,
      body: body ? JSON.stringify(body) : null
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

  async postWebRequest<T>(uri: string, body: any): Promise<T> | never {
    const response = await fetch(uri, this.requestInit('post', body));

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

  async deleteWebRequest_(uri: string): Promise<any> | never {

    const response = await fetch(uri, this.requestInit('delete'));

    if (!response.ok) {
      let errorResponse = (await response.json()) as ErrorResponse;
      throw new ErrorResponseException(errorResponse);
    }
  }
}
