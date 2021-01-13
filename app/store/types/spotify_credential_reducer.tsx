import { Reducer } from 'redux';
import { TActions } from '../actions';
import { ICredential, InitialState } from '../state';
import { TSpotifyCredentialsActions, Types } from './spotify_credential_types';

const reducer: Reducer<ICredential, TActions> = (state: ICredential = InitialState.spotifyState.credential, action: TActions) => {

    var spotifyAction = action as TSpotifyCredentialsActions;
    if (spotifyAction === null) {
        return state;
    }

    console.log(spotifyAction.type);

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
            console.error(spotifyAction.payload);
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
            console.error(spotifyAction.payload);
            return state;

        default:
            return state;
    }
};

export default reducer;