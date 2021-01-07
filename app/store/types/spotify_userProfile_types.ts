import { Action } from "redux";

export enum Types {
    SPOTIFY_CURRENT_PROFILE_REQUEST = 'SPOTIFY_CURRENT_PROFILE_REQUEST',
    SPOTIFY_CURRENT_PROFILE_SUCCEESS = 'SPOTIFY_CURRENT_PROFILE_SUCCEESS',
    SPOTIFY_CURRENT_PROFILE_ERROR = 'SPOTIFY_CURRENT_PROFILE_ERROR',
}

export interface ISpotifyCurrentProfileRequest extends Action {
    type: Types.SPOTIFY_CURRENT_PROFILE_REQUEST;
}

export interface ISpotifyCurrentProfileSuccess extends Action {
    type: Types.SPOTIFY_CURRENT_PROFILE_SUCCEESS;
    payload: SpotifyApi.CurrentUsersProfileResponse;
}

export interface ISpotifyCurrentProfileError extends Action {
    type: Types.SPOTIFY_CURRENT_PROFILE_ERROR;
    payload: any;
}

export type TSpotifyCurrentProfileActions = ISpotifyCurrentProfileRequest | ISpotifyCurrentProfileSuccess | ISpotifyCurrentProfileError;