/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { ChannelListResponse } from "../../youtubeApi/youtube-api-models";
import { Action, TypedAction } from "../types";

export enum Types {
    YOUTUBE_CURRENT_PROFILE_REQUEST = 'YOUTUBE_CURRENT_PROFILE_REQUEST',
    YOUTUBE_CURRENT_PROFILE_SUCCEESS = 'YOUTUBE_CURRENT_PROFILE_SUCCEESS',
    YOUTUBE_CURRENT_PROFILE_ERROR = 'YOUTUBE_CURRENT_PROFILE_ERROR',
}

export type IYoutubeCurrentProfileRequest = TypedAction<Types.YOUTUBE_CURRENT_PROFILE_REQUEST>
export type IYoutubeCurrentProfileSuccess = Action<Types.YOUTUBE_CURRENT_PROFILE_SUCCEESS, ChannelListResponse>
export type IYoutubeCurrentProfileError = Action<Types.YOUTUBE_CURRENT_PROFILE_ERROR, any>

export type TYoutubeCurrentProfileActions = IYoutubeCurrentProfileRequest | IYoutubeCurrentProfileSuccess | IYoutubeCurrentProfileError;