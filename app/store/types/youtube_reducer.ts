import { combineReducers, Reducer } from 'redux';
import { TActions } from '../actions';
import { IYoutubeState } from '../state';
import credentialReducer from './youtube_credential_reducer';
import userProfileReducer from './youtube_userProfile_reducer';

const reducer: Reducer<IYoutubeState> = combineReducers<IYoutubeState, TActions>
({
    credential: credentialReducer,
    userProfile: userProfileReducer
});

export default reducer;