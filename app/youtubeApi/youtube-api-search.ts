import {Base} from './youtube-api-base';
import {SearchListParameter, SearchListResponse} from './youtube-api-models';

export interface ISearch {
  list(params: SearchListParameter): Promise<SearchListResponse>;
}

export class Search extends Base implements ISearch {
  constructor(token: string) {
    super(token, 'search');
  }

  async list(params: SearchListParameter): Promise<SearchListResponse> | never {
    return await this.getWebRequest<SearchListResponse>(this.buildUri(params));
  }
}
