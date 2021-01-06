import {Base} from './youtube-api-base';
import {
  PlaylistItemDeleteParameter,
  PlaylistItemInsertParameter,
  PlaylistItemInsertResponse,
  PlaylistItemListParameter,
  PlaylistItemListResponse,
} from './youtube-api-models';

export interface IPlaylistItems {
  list(params: PlaylistItemListParameter): Promise<PlaylistItemListResponse>;
  insert(
    params: PlaylistItemInsertParameter,
  ): Promise<PlaylistItemInsertResponse>;
  delete(params: PlaylistItemDeleteParameter): Promise<any>;
}

export class PlaylistItems extends Base implements IPlaylistItems {
  constructor(token: string) {
    super(token, 'playlistItems');
  }

  async list(
    params: PlaylistItemListParameter,
  ): Promise<PlaylistItemListResponse> | never {
    return await this.getWebRequest<PlaylistItemListResponse>(
      this.buildUri(params),
    );
  }
  async insert(
    params: PlaylistItemInsertParameter,
  ): Promise<PlaylistItemInsertResponse> | never {
    return await this.postWebRequest<PlaylistItemListResponse>(
      this.buildUri(params),
    );
  }
  async delete(params: PlaylistItemDeleteParameter): Promise<any> | never {
    return await this.deleteWebRequest<any>(this.buildUri(params));
  }
}
