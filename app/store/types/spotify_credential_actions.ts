import { AuthorizeResult, RefreshResult } from 'react-native-app-auth';
import { ActionCreator } from 'redux';
import { ISpotifyApiAuthorizeError, ISpotifyApiAuthorizeRequest, ISpotifyApiAuthorizeSuccess, IspotifyApiRefreshError, ISpotifyApiRefreshRequest, ISpotifyApiRefreshSuccess, Types } from './spotify_credential_types';

export const spotifyApiAuthorizeRequest: ActionCreator<ISpotifyApiAuthorizeRequest> = () => ({
    type: Types.SPOTIFY_API_AUTHORIZE_REQUEST,
});

export const spotifyApiAuthorizeSucess: ActionCreator<ISpotifyApiAuthorizeSuccess> = (result: AuthorizeResult) => ({
    type: Types.SPOTIFY_API_AUTHORIZE_SUCCEESS,
    payload: result
});

export const spotifyApiAuthorizeError: ActionCreator<ISpotifyApiAuthorizeError> = (result: any) => ({
    type: Types.SPOTIFY_API_AUTHORIZE_ERROR,
    payload: result
});

export const spotifyApiRefreshRequest: ActionCreator<ISpotifyApiRefreshRequest> = () => ({
    type: Types.SPOTIFY_API_REFRESH_REQUEST,
});

export const spotifyApiRefreshSucess: ActionCreator<ISpotifyApiRefreshSuccess> = (result: RefreshResult) => ({
    type: Types.SPOTIFY_API_REFRESH_SUCCEESS,
    payload: result
});

export const spotifyApiRefreshError: ActionCreator<IspotifyApiRefreshError> = (result: any) => ({
    type: Types.SPOTIFY_API_REFRESH_ERROR,
    payload: result
});