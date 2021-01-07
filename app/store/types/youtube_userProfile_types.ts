import { Action } from "redux";
import { ChannelListResponse } from "../../youtubeApi/youtube-api-models";

export enum Types {
    YOUTUBE_CURRENT_PROFILE_REQUEST = 'YOUTUBE_CURRENT_PROFILE_REQUEST',
    YOUTUBE_CURRENT_PROFILE_SUCCEESS = 'YOUTUBE_CURRENT_PROFILE_SUCCEESS',
    YOUTUBE_CURRENT_PROFILE_ERROR = 'YOUTUBE_CURRENT_PROFILE_ERROR',
}

export interface IYoutubeCurrentProfileRequest extends Action {
    type: Types.YOUTUBE_CURRENT_PROFILE_REQUEST;
}

export interface IYoutubeCurrentProfileSuccess extends Action {
    type: Types.YOUTUBE_CURRENT_PROFILE_SUCCEESS;
    payload: ChannelListResponse;
}

export interface IYoutubeCurrentProfileError extends Action {
    type: Types.YOUTUBE_CURRENT_PROFILE_ERROR;
    payload: any;
}

export type TYoutubeCurrentProfileActions = IYoutubeCurrentProfileRequest | IYoutubeCurrentProfileSuccess | IYoutubeCurrentProfileError;