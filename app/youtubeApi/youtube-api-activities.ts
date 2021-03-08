import Base from './youtube-api-base';
import {
  ActivityListParameter,
  ActivityListResponse,
} from './youtube-api-models';

export interface IActivities {
  list(params: ActivityListParameter): Promise<ActivityListResponse>;
}

export class Activities extends Base implements IActivities {
  constructor(token: string) {
    super(token, 'activities');
  }

  async list(
    params: ActivityListParameter,
  ): Promise<ActivityListResponse> | never {
    return this.getWebRequest<ActivityListResponse>(
      this.buildUri(params),
    );
  }
}
