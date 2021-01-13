import { Reducer } from 'redux';
import { PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { TActions } from '../actions';
import { InitialState, IYoutubePlaylists } from '../state';
import { TYoutubePlaylistsActions, Types } from './youtube_playlists_types';

const reducer: Reducer<IYoutubePlaylists, TActions> = (state: IYoutubePlaylists = InitialState.youtubeState.playlists, action: TActions) => {

    var youtubeAction = action as TYoutubePlaylistsActions;
    if (youtubeAction === null) {
        return state;
    }

    console.log(youtubeAction.type);

    switch (youtubeAction.type) {
        case Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_REQUEST:
            return state;

        case Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_SUCCESS:
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

                        const yearPlaylist = copy.yearPlaylist.find(p => p.year === year);
                        if (yearPlaylist) {
                            const monthPlaylist = yearPlaylist.playlists.find(p => p.month === month);
                            if (monthPlaylist) {
                                items.forEach(i => monthPlaylist.itemsFromFavorites.push(i))
                            } else {
                                yearPlaylist.playlists.push({
                                    month: month,
                                    items: [],
                                    itemsFromFavorites: items,
                                })
                            }
                        } else {
                            copy.yearPlaylist.push({
                                year: year,
                                playlists: [
                                    {
                                        month: month,
                                        items: [],
                                        itemsFromFavorites: items,
                                    }
                                ]
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

        case Types.YOUTUBE_PLAYLISTS_FAVORITES_ITEMS_ERROR:
            console.error(youtubeAction.payload);
            return state;

        case Types.YOUTUBE_PLAYLISTS_ITEMS_REQUEST:
            return state;

        case Types.YOUTUBE_PLAYLISTS_ITEMS_SUCCESS:
            if (youtubeAction.payload) {
                const copy = state.yearPlaylist;
                const year = youtubeAction.payload.year;
                const month = youtubeAction.payload.month;
                const yearPlaylist = copy.find(p => p.year === year);
                if (yearPlaylist) {
                    const monthPlaylist = yearPlaylist.playlists.find(p => p.month === month);
                    if (monthPlaylist) {
                        youtubeAction.payload.items.forEach(i => monthPlaylist.items.push(i))
                    } else {
                        yearPlaylist.playlists.push({
                            month: month,
                            items: youtubeAction.payload.items,
                            itemsFromFavorites: [],
                        })
                    }
                } else {
                    copy.push({
                        year: year,
                        playlists: [
                            {
                                month: month,
                                items: youtubeAction.payload.items,
                                itemsFromFavorites: [],
                            }
                        ]
                    })
                }

                return { ...state, yearPlaylist: copy };
            }
            return state;

        case Types.YOUTUBE_PLAYLISTS_ITEMS_ERROR:
            console.error(youtubeAction.payload);
            return state;

        default:
            return state;
    }
};

export default reducer;