import { combineReducers, Reducer } from 'redux';
import { TActions } from './actions';
import { IApplicationState } from './state';
import spotifyReducer from './types/spotify_credential_reducer';
import youtubeReducer from './types/youtube_credential_reducer';

export const reducer: Reducer<IApplicationState> = combineReducers<IApplicationState, TActions>
({
    spotifyState: spotifyReducer,
    youtubeState: youtubeReducer
});