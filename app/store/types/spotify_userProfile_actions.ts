import { ActionCreator } from 'redux';
import { ISpotifyCurrentProfileError, ISpotifyCurrentProfileRequest, ISpotifyCurrentProfileSuccess, Types } from './spotify_userProfile_types';

export const spotifyCurrentProfileRequest: ActionCreator<ISpotifyCurrentProfileRequest> = () => ({
    type: Types.SPOTIFY_CURRENT_PROFILE_REQUEST,
});

export const spotifyCurrentProfileSucess: ActionCreator<ISpotifyCurrentProfileSuccess> = (result: SpotifyApi.CurrentUsersProfileResponse) => ({
    type: Types.SPOTIFY_CURRENT_PROFILE_SUCCEESS,
    payload: result
});

export const spotifyCurrentProfileError: ActionCreator<ISpotifyCurrentProfileError> = (result: any) => ({
    type: Types.SPOTIFY_CURRENT_PROFILE_ERROR,
    payload: result
});