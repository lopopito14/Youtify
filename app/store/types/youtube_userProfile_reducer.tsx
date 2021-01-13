import { Reducer } from 'redux';
import { TActions } from '../actions';
import { InitialState, IYoutubeProfile } from '../state';
import { TYoutubeCurrentProfileActions, Types } from './youtube_userProfile_types';

const reducer: Reducer<IYoutubeProfile, TActions> = (state: IYoutubeProfile = InitialState.youtubeState.userProfile, action: TActions) => {

    var youtubeAction = action as TYoutubeCurrentProfileActions;
    if (youtubeAction === null) {
        return state;
    }

    console.log(youtubeAction.type);

    switch (youtubeAction.type) {
        case Types.YOUTUBE_CURRENT_PROFILE_REQUEST:
            return { ...state, loading: true, loaded: false };

        case Types.YOUTUBE_CURRENT_PROFILE_SUCCEESS:
            if (youtubeAction.payload.items && youtubeAction.payload.items.length > 0) {
                const channel = youtubeAction.payload.items[0];
                return {
                    ...state,
                    loading: false,
                    loaded: true,
                    title: channel.snippet?.title ? channel.snippet?.title : 'Not Available',
                    channelId: channel.id ? channel.id : 'Not Available',
                };
            }
            return state;

        case Types.YOUTUBE_CURRENT_PROFILE_ERROR:
            console.error(youtubeAction.payload);
            return { ...state, loading: false, loaded: false };

        default:
            return state;
    }
};

export default reducer;