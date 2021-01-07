import { combineReducers, Reducer } from 'redux';
import { TActions } from '../actions';
import { ISpotifyState } from '../state';
import credentialReducer from './spotify_credential_reducer';
import userProfileReducer from './spotify_userProfile_reducer';

const reducer: Reducer<ISpotifyState> = combineReducers<ISpotifyState, TActions>
({
    credential: credentialReducer,
    userProfile: userProfileReducer
});

export default reducer;