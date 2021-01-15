import { Reducer } from 'redux';
import { PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { TActions } from '../actions';
import { IMyPlaylist, InitialState, } from '../state';
import { TYoutubePlaylistsActions, Types } from './youtube_playlists_types';

const reducer: Reducer<IMyPlaylist, TActions> = (state: IMyPlaylist = InitialState.myPlaylist, action: TActions) => {

    var youtubeAction = action as TYoutubePlaylistsActions;
    if (youtubeAction === null) {
        return state;
    }

    console.log(youtubeAction.type);

    switch (youtubeAction.type) {
        case Types.BIND_YOUTUBE_FAVORITE_ITEMS_REQUEST:
            return { ...state, loading: true };

        case Types.BIND_YOUTUBE_FAVORITE_ITEMS_SUCCESS:
            if (youtubeAction.payload) {
                const copy = state;

                var year: number | undefined;
                var month: number | undefined;
                var items: PlaylistItem[] = [];

                for (let index = 0; index < youtubeAction.payload.items.length; index++) {
                    const item = youtubeAction.payload.items[index];

                    if (item.snippet?.publishedAt) {
                        const date = new Date(item.snippet?.publishedAt);
                        const currentYear = date.getFullYear();
                        const currentMonth = date.getMonth() + 1;

                        if (!year || !month) {
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            items.push(item);
                            continue;
                        }

                        if (year === currentYear && month === currentMonth) {
                            items.push(item);
                            continue;
                        }

                        const playlist = copy.myPlaylists.find(p => p.year === year && p.month === month);
                        if (playlist) {
                            items.forEach(i => playlist.favoriteitems.push(i));
                        } else {
                            copy.myPlaylists.push({
                                year: year,
                                month: month,
                                title: `Playlist ${year} - ${(month < 10) ? '0' : ''}${month}`,
                                synchronized: items.length === 0,
                                favoriteitems: items,
                            })
                        }

                        year = currentYear;
                        month = currentMonth;
                        items = [item];
                    }
                }

                return copy;
            }
            return state;

        case Types.BIND_YOUTUBE_FAVORITE_ITEMS_COMPLETE:
            return { ...state, loading: false, loaded: true };

        case Types.BIND_YOUTUBE_FAVORITE_ITEMS_ERROR:
            console.error(youtubeAction.payload);
            return { ...state, loading: false, loaded: false };

        case Types.BIND_YOUTUBE_PLAYLIST:
            if (youtubeAction.payload) {

                const year = youtubeAction.payload.year;
                const month = youtubeAction.payload.month;

                const playlist = state.myPlaylists.find(p => p.year === year && p.month === month);
                if (playlist) {

                    const index = state.myPlaylists.indexOf(playlist);

                    if (youtubeAction.payload.playlist) {

                        return {
                            ...state,
                            myPlaylists: [
                                ...state.myPlaylists.slice(0, index),
                                {
                                    ...playlist,
                                    youtube: {
                                        playlist: youtubeAction.payload.playlist,
                                        items: []
                                    }
                                },
                                ...state.myPlaylists.slice(index + 1)]
                        };
                    } else {
                        return {
                            ...state,
                            myPlaylists: [
                                ...state.myPlaylists.slice(0, index),
                                {
                                    ...playlist,
                                    youtube: undefined
                                },
                                ...state.myPlaylists.slice(index + 1)]
                        };
                    }


                } else {
                    console.error('not found');
                }
            }
            return state;

        case Types.BIND_YOUTUBE_PLAYLIST_ITEMS_REQUEST:
            return state;

        case Types.BIND_YOUTUBE_PLAYLIST_ITEMS_SUCCESS:
            if (youtubeAction.payload) {

                const year = youtubeAction.payload.year;
                const month = youtubeAction.payload.month;

                const playlist = state.myPlaylists.find(p => p.year === year && p.month === month);
                if (playlist && playlist.youtube) {

                    const index = state.myPlaylists.indexOf(playlist);

                    return {
                        ...state,
                        myPlaylists: [
                            ...state.myPlaylists.slice(0, index),
                            {
                                ...playlist,
                                youtube: {
                                    ...playlist.youtube,
                                    items: [
                                        ...playlist.youtube?.items,
                                        ...youtubeAction.payload.items
                                    ]
                                }
                            },
                            ...state.myPlaylists.slice(index + 1)]
                    };

                } else {
                    console.error('not found');
                }
            }
            return state;

        case Types.BIND_YOUTUBE_PLAYLIST_ITEMS_COMPLETE:
            return state;

        case Types.BIND_YOUTUBE_PLAYLIST_ITEMS_ERROR:
            console.error(youtubeAction.payload);
            return state;

        case Types.SYNCHRONIZE_YOUTUBE_PLAYLIST_ITEMS_SUCCESS:
            if (youtubeAction.payload) {

                const year = youtubeAction.payload.year;
                const month = youtubeAction.payload.month;

                const playlist = state.myPlaylists.find(p => p.year === year && p.month === month);
                if (playlist && playlist.youtube) {

                    const index = state.myPlaylists.indexOf(playlist);

                    return {
                        ...state,
                        myPlaylists: [
                            ...state.myPlaylists.slice(0, index),
                            {
                                ...playlist,
                                synchronized: true,
                                youtube: {
                                    ...playlist.youtube,
                                    items: playlist.favoriteitems
                                }
                            },
                            ...state.myPlaylists.slice(index + 1)]
                    };

                } else {
                    console.error('not found');
                }
            }
            return state;

        default:
            return state;
    }
};

export default reducer;