import { Reducer } from 'redux';
import { TActions } from '../actions';
import { ICredential, InitialState } from '../state';
import { TYoutubeCredentialsActions, Types } from './youtube_credential_types';

const reducer: Reducer<ICredential, TActions> = (state: ICredential = InitialState.youtubeState.credential, action: TActions) => {

    var youtubeAction = action as TYoutubeCredentialsActions;
    if (youtubeAction === null) {
        return state;
    }

    console.log(youtubeAction.type);

    switch (youtubeAction.type) {
        case Types.YOUTUBE_API_AUTHORIZE_REQUEST:
            return state;

        case Types.YOUTUBE_API_AUTHORIZE_SUCCESS:
            return {
                ...state,
                isLogged: true,
                accessToken: youtubeAction.payload.accessToken,
                accessTokenExpirationDate: youtubeAction.payload.accessTokenExpirationDate,
                refreshToken: youtubeAction.payload.refreshToken
            };

        case Types.YOUTUBE_API_AUTHORIZE_ERROR:
            return {
                ...state,
                isLogged: false,
                accessToken: '',
                accessTokenExpirationDate: '',
                refreshToken: ''
            };

        case Types.YOUTUBE_API_REFRESH_REQUEST:
            return state;

        case Types.YOUTUBE_API_REFRESH_SUCCESS:
            return {
                ...state,
                isLogged: true,
                accessToken: youtubeAction.payload.accessToken,
                accessTokenExpirationDate: youtubeAction.payload.accessTokenExpirationDate,
                refreshToken: youtubeAction.payload.refreshToken ? youtubeAction.payload.refreshToken : ''
            };

        case Types.YOUTUBE_API_REFRESH_ERROR:
            return {
                ...state,
                isLogged: false,
                accessToken: '',
                accessTokenExpirationDate: '',
                refreshToken: ''
            };

            case Types.YOUTUBE_API_REVOKE_REQUEST:
            return state;

        case Types.YOUTUBE_API_REVOKE_SUCCESS:
            return {
                ...state,
                isLogged: true,
                accessToken: '',
                accessTokenExpirationDate: '',
                refreshToken: ''
            };

        case Types.YOUTUBE_API_REVOKE_ERROR:
            return {
                ...state,
                isLogged: false,
                accessToken: '',
                accessTokenExpirationDate: '',
                refreshToken: ''
            };
    
        default:
            return state;
    }
}

export default reducer;