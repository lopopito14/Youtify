import { Reducer } from 'redux';
import { PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { TActions } from '../actions';
import { IMyPlaylist, InitialState, } from '../state';
import { TMyPlaylistsActions, Types } from './my_playlists_types';

const reducer: Reducer<IMyPlaylist, TActions> = (state: IMyPlaylist = InitialState.myPlaylist, action: TActions) => {

    var myPlaylistAction = action as TMyPlaylistsActions;
    if (myPlaylistAction === null) {
        return state;
    }

    console.log(myPlaylistAction.type);

    switch (myPlaylistAction.type) {
        case Types.BIND_YOUTUBE_FAVORITE_ITEMS_REQUEST:
            return { ...state, loading: true };

        case Types.BIND_YOUTUBE_FAVORITE_ITEMS_SUCCESS:
            if (myPlaylistAction.payload) {
                const copy = state;

                var year: number | undefined;
                var month: number | undefined;
                var items: PlaylistItem[] = [];

                for (let index = 0; index < myPlaylistAction.payload.items.length; index++) {
                    const item = myPlaylistAction.payload.items[index];

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
            return { ...state, loading: false, loaded: false };

        case Types.BIND_YOUTUBE_PLAYLIST:
            if (myPlaylistAction.payload) {

                const year = myPlaylistAction.payload.year;
                const month = myPlaylistAction.payload.month;

                const playlist = state.myPlaylists.find(p => p.year === year && p.month === month);
                if (playlist) {

                    const index = state.myPlaylists.indexOf(playlist);

                    if (myPlaylistAction.payload.playlist) {

                        return {
                            ...state,
                            myPlaylists: [
                                ...state.myPlaylists.slice(0, index),
                                {
                                    ...playlist,
                                    youtube: {
                                        playlist: myPlaylistAction.payload.playlist,
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
            if (myPlaylistAction.payload) {

                const year = myPlaylistAction.payload.year;
                const month = myPlaylistAction.payload.month;

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
                                        ...myPlaylistAction.payload.items
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
            return state;

        case Types.SYNCHRONIZE_YOUTUBE_PLAYLIST_ITEMS_SUCCESS:
            if (myPlaylistAction.payload) {

                const year = myPlaylistAction.payload.year;
                const month = myPlaylistAction.payload.month;

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

        case Types.BIND_SPOTIFY_PLAYLIST:
            if (myPlaylistAction.payload) {

                const year = myPlaylistAction.payload.year;
                const month = myPlaylistAction.payload.month;

                const playlist = state.myPlaylists.find(p => p.year === year && p.month === month);
                if (playlist) {

                    const index = state.myPlaylists.indexOf(playlist);

                    if (myPlaylistAction.payload.playlist) {

                        return {
                            ...state,
                            myPlaylists: [
                                ...state.myPlaylists.slice(0, index),
                                {
                                    ...playlist,
                                    spotify: {
                                        playlist: myPlaylistAction.payload.playlist,
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
                                    spotify: undefined
                                },
                                ...state.myPlaylists.slice(index + 1)]
                        };
                    }


                } else {
                    console.error('not found');
                }
            }
            return state;

        case Types.BIND_SPOTIFY_PLAYLIST_TRACKS_REQUEST:
            return state;

        case Types.BIND_SPOTIFY_PLAYLIST_TRACKS_SUCCESS:
            if (myPlaylistAction.payload) {

                const year = myPlaylistAction.payload.year;
                const month = myPlaylistAction.payload.month;

                const playlist = state.myPlaylists.find(p => p.year === year && p.month === month);
                if (playlist && playlist.spotify) {

                    const index = state.myPlaylists.indexOf(playlist);

                    return {
                        ...state,
                        myPlaylists: [
                            ...state.myPlaylists.slice(0, index),
                            {
                                ...playlist,
                                spotify: {
                                    ...playlist.spotify,
                                    items: [
                                        ...playlist.spotify?.items,
                                        ...myPlaylistAction.payload.items
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

        case Types.BIND_SPOTIFY_PLAYLIST_TRACKS_COMPLETE:
            return state;

        case Types.BIND_SPOTIFY_PLAYLIST_TRACKS_ERROR:
            return state;

        default:
            return state;
    }
};

export default reducer;