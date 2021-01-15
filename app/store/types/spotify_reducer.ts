import { combineReducers, Reducer } from 'redux';
import { TActions } from '../actions';
import { ISpotifyProfile, IProfile } from '../state';
import credentialReducer from './spotify_credential_reducer';
import userProfileReducer from './spotify_userProfile_reducer';

const reducer: Reducer<IProfile<ISpotifyProfile>> = combineReducers<IProfile<ISpotifyProfile>, TActions>
({
    credential: credentialReducer,
    userProfile: userProfileReducer
});

export default reducer;