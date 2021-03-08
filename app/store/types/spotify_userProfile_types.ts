/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { Action, TypedAction } from "../types";

export enum Types {
    SPOTIFY_CURRENT_PROFILE_REQUEST = 'SPOTIFY_CURRENT_PROFILE_REQUEST',
    SPOTIFY_CURRENT_PROFILE_SUCCEESS = 'SPOTIFY_CURRENT_PROFILE_SUCCEESS',
    SPOTIFY_CURRENT_PROFILE_ERROR = 'SPOTIFY_CURRENT_PROFILE_ERROR',
}

export type ISpotifyCurrentProfileRequest = TypedAction<Types.SPOTIFY_CURRENT_PROFILE_REQUEST>
export type ISpotifyCurrentProfileSuccess = Action<Types.SPOTIFY_CURRENT_PROFILE_SUCCEESS, SpotifyApi.CurrentUsersProfileResponse>
export type ISpotifyCurrentProfileError = Action<Types.SPOTIFY_CURRENT_PROFILE_ERROR, any>

export type TSpotifyCurrentProfileActions = ISpotifyCurrentProfileRequest | ISpotifyCurrentProfileSuccess | ISpotifyCurrentProfileError;