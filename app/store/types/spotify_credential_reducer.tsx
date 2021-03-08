import { Reducer } from 'redux';
import { TActions } from '../actions';
import { ICredential, InitialState } from '../state';
import { TSpotifyCredentialsActions, Types } from './spotify_credential_types';

const reducer: Reducer<ICredential, TActions> = (state: ICredential = InitialState.spotifyState.credential, action: TActions) => {

    const spotifyAction = action as TSpotifyCredentialsActions;
    if (spotifyAction === null) {
        return state;
    }

    switch (spotifyAction.type) {
        case Types.SPOTIFY_API_AUTHORIZE_REQUEST:
            return state;

        case Types.SPOTIFY_API_AUTHORIZE_SUCCEESS:
            return {
                ...state,
                isLogged: true,
                accessToken: spotifyAction.payload.accessToken,
                accessTokenExpirationDate: spotifyAction.payload.accessTokenExpirationDate,
                refreshToken: spotifyAction.payload.refreshToken ? spotifyAction.payload.refreshToken : ''
            };

        case Types.SPOTIFY_API_AUTHORIZE_ERROR:
            return state;

        case Types.SPOTIFY_API_REFRESH_REQUEST:
            return state;

        case Types.SPOTIFY_API_REFRESH_SUCCEESS:
            return {
                ...state,
                isLogged: true,
                accessToken: spotifyAction.payload.accessToken,
                accessTokenExpirationDate: spotifyAction.payload.accessTokenExpirationDate,
                refreshToken: spotifyAction.payload.refreshToken ? spotifyAction.payload.refreshToken : ''
            };

        case Types.SPOTIFY_API_REFRESH_ERROR:
            return state;

        default:
            return state;
    }
};

export default reducer;