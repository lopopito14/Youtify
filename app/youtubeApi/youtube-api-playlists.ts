import {Base} from './youtube-api-base';
import {
  PlaylistDeleteParameter,
  PlaylistInsertParameter,
  PlaylistInsertResponse,
  PlaylistListParameter,
  PlaylistListResponse,
} from './youtube-api-models';

export interface IPlaylists {
  list(params: PlaylistListParameter): Promise<PlaylistListResponse>;
  insert(params: PlaylistInsertParameter): Promise<PlaylistInsertResponse>;
  delete(params: PlaylistDeleteParameter): Promise<any>;
}

export class Playlists extends Base implements IPlaylists {
  constructor(token: string) {
    super(token, 'playlists');
  }

  async list(
    params: PlaylistListParameter,
  ): Promise<PlaylistListResponse> | never {
    return await this.getWebRequest<PlaylistListResponse>(
      this.buildUri(params),
    );
  }
  async insert(
    params: PlaylistInsertParameter,
  ): Promise<PlaylistInsertResponse> | never {
    return await this.postWebRequest<PlaylistListResponse>(
      this.buildUri(params),
      params.requestBody
    );
  }
  async delete(params: PlaylistDeleteParameter): Promise<any> | never {
    return await this.deleteWebRequest_(this.buildUri(params));
  }
}
