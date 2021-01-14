import { combineReducers, Reducer } from 'redux';
import { TActions } from '../actions';
import { IYoutubeState } from '../state';
import credentialReducer from './youtube_credential_reducer';
import userProfileReducer from './youtube_userProfile_reducer';
import playlistsReducer from './youtube_playlists_reducer';

const reducer: Reducer<IYoutubeState> = combineReducers<IYoutubeState, TActions>
({
    credential: credentialReducer,
    userProfile: userProfileReducer,
    playlists: playlistsReducer
});

export default reducer;