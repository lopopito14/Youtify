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

        case Types.YOUTUBE_API_AUTHORIZE_SUCCEESS:
            return {
                ...state,
                isLogged: true,
                accessToken: youtubeAction.payload.accessToken,
                accessTokenExpirationDate: youtubeAction.payload.accessTokenExpirationDate,
                refreshToken: youtubeAction.payload.refreshToken
            };

        case Types.YOUTUBE_API_AUTHORIZE_ERROR:
            console.error(youtubeAction.payload);
            return state;

        case Types.YOUTUBE_API_REFRESH_REQUEST:
            return state;

        case Types.YOUTUBE_API_REFRESH_SUCCEESS:
            return {
                ...state,
                isLogged: true,
                accessToken: youtubeAction.payload.accessToken,
                accessTokenExpirationDate: youtubeAction.payload.accessTokenExpirationDate,
                refreshToken: youtubeAction.payload.refreshToken ? youtubeAction.payload.refreshToken : ''
            };

        case Types.YOUTUBE_API_REFRESH_ERROR:
            console.error(youtubeAction.payload);
            return state;
    
        default:
            return state;
    }
}

export default reducer;