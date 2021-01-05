import { Base } from "./youtube-api-base";
import { ChannelListParameter, ChannelListResponse } from "./youtube-api-models";

export interface IChannels {
  list(params: ChannelListParameter): Promise<ChannelListResponse>;
}

export class Channels extends Base implements IChannels {
  constructor(token: string) {
    super(token, 'channels');
  }

  async list(params: ChannelListParameter): Promise<ChannelListResponse> | never {
    return await this.getWebRequest<ChannelListResponse>(this.buildUri(params));
  }
}
