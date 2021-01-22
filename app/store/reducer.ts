import { combineReducers, Reducer } from 'redux';
import { TActions } from './actions';
import { IApplicationState } from './state';
import spotifyReducer from './types/spotify_reducer';
import youtubeReducer from './types/youtube_reducer';
import notificationsReducer from './types/notifications_reducer';

export const reducer: Reducer<IApplicationState> = combineReducers<IApplicationState, TActions>
({
    spotifyState: spotifyReducer,
    youtubeState: youtubeReducer,
    notifications: notificationsReducer
});