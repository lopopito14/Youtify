import { Action, TypedAction } from "../types";

export enum Types {
    SPOTIFY_CURRENT_PROFILE_REQUEST = 'SPOTIFY_CURRENT_PROFILE_REQUEST',
    SPOTIFY_CURRENT_PROFILE_SUCCEESS = 'SPOTIFY_CURRENT_PROFILE_SUCCEESS',
    SPOTIFY_CURRENT_PROFILE_ERROR = 'SPOTIFY_CURRENT_PROFILE_ERROR',
}

export interface ISpotifyCurrentProfileRequest extends TypedAction<Types.SPOTIFY_CURRENT_PROFILE_REQUEST> {}
export interface ISpotifyCurrentProfileSuccess extends Action<Types.SPOTIFY_CURRENT_PROFILE_SUCCEESS, SpotifyApi.CurrentUsersProfileResponse> {}
export interface ISpotifyCurrentProfileError extends Action<Types.SPOTIFY_CURRENT_PROFILE_ERROR, any> {}

export type TSpotifyCurrentProfileActions = ISpotifyCurrentProfileRequest | ISpotifyCurrentProfileSuccess | ISpotifyCurrentProfileError;