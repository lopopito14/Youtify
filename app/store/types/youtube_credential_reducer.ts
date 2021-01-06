import { Reducer } from 'redux';
import { TActions } from '../actions';
import { InitialState, IYoutubeState } from '../state';
import { TYoutubeCredentialsActions, Types } from './youtube_credential_types';

const reducer: Reducer<IYoutubeState, TActions> = (state: IYoutubeState = InitialState.youtubeState, action: TActions) => {

    var youtubeAction = action as TYoutubeCredentialsActions;
    if (youtubeAction === null) {
        return state;
    }

    switch (youtubeAction.type) {
        case Types.YOUTUBE_API_AUTHORIZE_REQUEST:
            console.log('YOUTUBE_API_AUTHORIZE_REQUEST');
            return state;

        case Types.YOUTUBE_API_AUTHORIZE_SUCCEESS:
            console.log('YOUTUBE_API_AUTHORIZE_SUCCEESS');
            return {
                ...state,
                credential:
                {
                    accessToken: youtubeAction.payload.accessToken,
                    accessTokenExpirationDate: youtubeAction.payload.accessTokenExpirationDate,
                    refreshToken: youtubeAction.payload.refreshToken
                }
            };

        case Types.YOUTUBE_API_AUTHORIZE_ERROR:
            console.log('YOUTUBE_API_AUTHORIZE_ERROR');
            return state;

        case Types.YOUTUBE_API_REFRESH_REQUEST:
            console.log('YOUTUBE_API_REFRESH_REQUEST');
            return state;

        case Types.YOUTUBE_API_REFRESH_SUCCEESS:
            console.log('YOUTUBE_API_REFRESH_SUCCEESS');
            return {
                ...state,
                credential:
                {
                    accessToken: youtubeAction.payload.accessToken,
                    accessTokenExpirationDate: youtubeAction.payload.accessTokenExpirationDate,
                    refreshToken: youtubeAction.payload.refreshToken ? youtubeAction.payload.refreshToken : ''
                }
            };

        case Types.YOUTUBE_API_REFRESH_ERROR:
            console.log('YOUTUBE_API_REFRESH_ERROR');
            return state;
    
        default:
            return state;
    }
}

export default reducer;