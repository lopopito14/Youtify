/* eslint-disable @typescript-eslint/no-explicit-any */
import Base from './youtube-api-base';
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
    return this.getWebRequest<PlaylistItemListResponse>(
      this.buildUri(params),
    );
  }

  async insert(
    params: PlaylistItemInsertParameter,
  ): Promise<PlaylistItemInsertResponse> | never {
    return this.postWebRequest<PlaylistItemListResponse>(
      this.buildUri(params),
      params.requestBody
    );
  }

  async delete(params: PlaylistItemDeleteParameter): Promise<any> | never {
    return this.deleteWebRequest(this.buildUri(params));
  }
}
