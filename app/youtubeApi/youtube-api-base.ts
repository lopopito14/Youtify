/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ErrorResponse, ErrorResponseException} from './youtube-api-models';

class Base {
  baseUri = 'https://youtube.googleapis.com/youtube/v3/';

  token: string;

  uriExtension: string;

  constructor(token: string, uriExtension: string) {
    this.token = token;
    this.uriExtension = uriExtension;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  buildUri(parameters: object): string {
    let paramUri = '';

    Object.entries(parameters).forEach(element => {
      const [key, value] = element;
      if (value) {
        paramUri += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
      }
      
    });

    // remove last '&'
    if (paramUri !== '') {
      paramUri = `?${  paramUri.slice(0, -1)}`;
    }

    return this.baseUri + this.uriExtension + paramUri;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  requestInit(method: string, body?: any): RequestInit {
    return {
      headers: {
        'Content-Type': "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${  this.token}`,
      },
      method,
      body: body ? JSON.stringify(body) : null
    };
  }

  async getWebRequest<T>(uri: string): Promise<T> | never {
    const response = await fetch(uri, this.requestInit('get'));

    if (!response.ok) {
      const errorResponse = (await response.json()) as ErrorResponse;
      throw new ErrorResponseException(errorResponse);
    }

    return (await response.json()) as T;
  }

  async postWebRequest<T>(uri: string, body: any): Promise<T> | never {
    const response = await fetch(uri, this.requestInit('post', body));

    if (!response.ok) {
      const errorResponse = (await response.json()) as ErrorResponse;
      throw new ErrorResponseException(errorResponse);
    }

    return (await response.json()) as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteWebRequest(uri: string): Promise<any> | never {

    const response = await fetch(uri, this.requestInit('delete'));

    if (!response.ok) {
      const errorResponse = (await response.json()) as ErrorResponse;
      throw new ErrorResponseException(errorResponse);
    }
  }
}

export default Base;