/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
import { ISpotifyCurrentProfileError, ISpotifyCurrentProfileRequest, ISpotifyCurrentProfileSuccess, Types } from './spotify_userProfile_types';

export function spotifyCurrentProfileRequest(): ISpotifyCurrentProfileRequest {
    return {
        type: Types.SPOTIFY_CURRENT_PROFILE_REQUEST
    }
}

export function spotifyCurrentProfileSucess(result: SpotifyApi.CurrentUsersProfileResponse): ISpotifyCurrentProfileSuccess {
    return {
        type: Types.SPOTIFY_CURRENT_PROFILE_SUCCEESS,
        payload: result
    }
}

export function spotifyCurrentProfileError(result: any): ISpotifyCurrentProfileError {
    return {
        type: Types.SPOTIFY_CURRENT_PROFILE_ERROR,
        payload: result
    }
}