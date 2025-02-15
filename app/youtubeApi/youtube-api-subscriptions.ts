/* eslint-disable @typescript-eslint/no-explicit-any */
import Base from './youtube-api-base';
import {
  SubscriptionDeleteParameter,
  SubscriptionInsertParameter,
  SubscriptionInsertResponse,
  SubscriptionListParameter,
  SubscriptionListResponse,
} from './youtube-api-models';

export interface ISubscriptions {
  list(params: SubscriptionListParameter): Promise<SubscriptionListResponse>;
  insert(
    params: SubscriptionInsertParameter,
  ): Promise<SubscriptionInsertResponse>;
  delete(params: SubscriptionDeleteParameter): Promise<any>;
}

export class Subscriptions extends Base implements ISubscriptions {
  constructor(token: string) {
    super(token, 'subscriptions');
  }

  async list(
    params: SubscriptionListParameter,
  ): Promise<SubscriptionListResponse> | never {
    return this.getWebRequest<SubscriptionListResponse>(
      this.buildUri(params),
    );
  }

  async insert(
    params: SubscriptionInsertParameter,
  ): Promise<SubscriptionInsertResponse> | never {
    return this.postWebRequest<SubscriptionListResponse>(
      this.buildUri(params),
      params.requestBody
    );
  }

  async delete(params: SubscriptionDeleteParameter): Promise<any> | never {
    return this.deleteWebRequest(this.buildUri(params));
  }
}
