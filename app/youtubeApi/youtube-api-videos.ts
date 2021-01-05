import { Base } from "./youtube-api-base";
import { VideoListParameter, VideoListResponse } from "./youtube-api-models";

export interface IVideos {
  list(params: VideoListParameter): Promise<VideoListResponse>;
}

export class Videos extends Base implements IVideos {
  constructor(token: string) {
    super(token, 'videos');
  }

  async list(params: VideoListParameter): Promise<VideoListResponse> | never {
    return await this.getWebRequest<VideoListResponse>(this.buildUri(params));
  }
}
