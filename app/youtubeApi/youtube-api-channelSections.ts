import Base from './youtube-api-base';
import {
  ChannelSectionListParameter,
  ChannelSectionListResponse,
} from './youtube-api-models';

export interface IChannelSections {
  list(
    params: ChannelSectionListParameter,
  ): Promise<ChannelSectionListResponse>;
}

export class ChannelSections extends Base implements IChannelSections {
  constructor(token: string) {
    super(token, 'channelSections');
  }

  async list(
    params: ChannelSectionListParameter,
  ): Promise<ChannelSectionListResponse> | never {
    return this.getWebRequest<ChannelSectionListResponse>(
      this.buildUri(params),
    );
  }
}
