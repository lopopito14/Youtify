import { combineReducers, Reducer } from 'redux';
import { TActions } from '../actions';
import { IProfile, IYoutubeProfile } from '../state';
import credentialReducer from './youtube_credential_reducer';
import userProfileReducer from './youtube_userProfile_reducer';

const reducer: Reducer<IProfile<IYoutubeProfile>> = combineReducers<IProfile<IYoutubeProfile>, TActions>
({
    credential: credentialReducer,
    userProfile: userProfileReducer,
});

export default reducer;