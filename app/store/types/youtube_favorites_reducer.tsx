import { Reducer } from 'redux';
import { TActions } from '../actions';
import { InitialState, IYoutubeFavorite } from '../state';
import { TYoutubeFavoritesActions, Types } from './youtube_favorites_types';

const reducer: Reducer<IYoutubeFavorite, TActions> = (state: IYoutubeFavorite = InitialState.youtubeState.favorite, action: TActions) => {

    var youtubeAction = action as TYoutubeFavoritesActions;
    if (youtubeAction === null) {
        return state;
    }

    console.log(youtubeAction.type);

    switch (youtubeAction.type) {
        case Types.YOUTUBE_FAVORITES_REQUEST:
            return { ...state, favoritePlaylist: { ...state.favoritePlaylist, loading: true, loaded: false } };

        case Types.YOUTUBE_FAVORITES_SUCCESS:
            if (youtubeAction.payload) {
                return { ...state, favoritePlaylist: { ...state.favoritePlaylist, playlist: youtubeAction.payload, loading: false, loaded: true } };
            }
            return state;

        case Types.YOUTUBE_FAVORITES_ERROR:
            console.error(youtubeAction.payload);
            return { ...state, favoritePlaylist: { ...state.favoritePlaylist, loading: false, loaded: false } };

        case Types.YOUTUBE_FAVORITES_ITEMS_REQUEST:
            return { ...state, favoritePlaylistItems: { ...state.favoritePlaylistItems, loading: true, loaded: false } };

        case Types.YOUTUBE_FAVORITES_ITEMS_SUCCESS:
            if (youtubeAction.payload) {
                return { ...state, favoritePlaylistItems: { ...state.favoritePlaylistItems, playlistItems: [...state.favoritePlaylistItems.playlistItems, ...youtubeAction.payload.items], progress: youtubeAction.payload.progress } };
            }
            return state;

        case Types.YOUTUBE_FAVORITES_ITEMS_COMPLETE:
            return { ...state, favoritePlaylistItems: { ...state.favoritePlaylistItems, loading: false, loaded: true } };

        case Types.YOUTUBE_FAVORITES_ITEMS_ERROR:
            console.error(youtubeAction.payload);
            return { ...state, favoritePlaylistItems: { ...state.favoritePlaylistItems, progress: 0, loading: false, loaded: false } };

        default:
            return state;
    }
};

export default reducer;