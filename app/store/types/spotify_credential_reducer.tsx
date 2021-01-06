import { Reducer } from 'redux';
import { TActions } from '../actions';
import { InitialState, ISpotifyState } from '../state';
import { TSpotifyCredentialsActions, Types } from './spotify_credential_types';

const reducer: Reducer<ISpotifyState, TActions> = (state: ISpotifyState = InitialState.spotifyState, action: TActions) => {

    var spotifyAction = action as TSpotifyCredentialsActions;
    if (spotifyAction === null) {
        return state;
    }

    switch (spotifyAction.type) {
        case Types.SPOTIFY_API_AUTHORIZE_REQUEST:
            console.log('SPOTIFY_API_AUTHORIZE_REQUEST');
            return state;

        case Types.SPOTIFY_API_AUTHORIZE_SUCCEESS:
            console.log('SPOTIFY_API_AUTHORIZE_SUCCEESS');
            return {
                ...state,
                credential:
                {
                    accessToken: spotifyAction.payload.accessToken,
                    accessTokenExpirationDate: spotifyAction.payload.accessTokenExpirationDate,
                    refreshToken: spotifyAction.payload.refreshToken
                }
            };

        case Types.SPOTIFY_API_AUTHORIZE_ERROR:
            console.log('SPOTIFY_API_AUTHORIZE_ERROR');
            return state;

        case Types.SPOTIFY_API_REFRESH_REQUEST:
            console.log('SPOTIFY_API_REFRESH_REQUEST');
            return state;

        case Types.SPOTIFY_API_REFRESH_SUCCEESS:
            console.log('SPOTIFY_API_REFRESH_SUCCEESS');
            return {
                ...state,
                credential:
                {
                    accessToken: spotifyAction.payload.accessToken,
                    accessTokenExpirationDate: spotifyAction.payload.accessTokenExpirationDate,
                    refreshToken: spotifyAction.payload.refreshToken ? spotifyAction.payload.refreshToken : ''
                }
            };

        case Types.SPOTIFY_API_REFRESH_ERROR:
            console.log('SPOTIFY_API_REFRESH_ERROR');
            return state;

        default:
            return state;
    }
};

export default reducer;