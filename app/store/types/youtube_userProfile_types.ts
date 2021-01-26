import { ChannelListResponse } from "../../youtubeApi/youtube-api-models";
import { Action, TypedAction } from "../types";

export enum Types {
    YOUTUBE_CURRENT_PROFILE_REQUEST = 'YOUTUBE_CURRENT_PROFILE_REQUEST',
    YOUTUBE_CURRENT_PROFILE_SUCCEESS = 'YOUTUBE_CURRENT_PROFILE_SUCCEESS',
    YOUTUBE_CURRENT_PROFILE_ERROR = 'YOUTUBE_CURRENT_PROFILE_ERROR',
}

export interface IYoutubeCurrentProfileRequest extends TypedAction<Types.YOUTUBE_CURRENT_PROFILE_REQUEST> {}
export interface IYoutubeCurrentProfileSuccess extends Action<Types.YOUTUBE_CURRENT_PROFILE_SUCCEESS, ChannelListResponse> {}
export interface IYoutubeCurrentProfileError extends Action<Types.YOUTUBE_CURRENT_PROFILE_ERROR, any> {}

export type TYoutubeCurrentProfileActions = IYoutubeCurrentProfileRequest | IYoutubeCurrentProfileSuccess | IYoutubeCurrentProfileError;