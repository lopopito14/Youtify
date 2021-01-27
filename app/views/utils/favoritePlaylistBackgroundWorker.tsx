import React from 'react'
import Context from '../../store/context';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { PlaylistItem } from '../../youtubeApi/youtube-api-models';
import { PlaylistItems } from '../../youtubeApi/youtube-api-playlistItems';
import { IMyPlaylists } from '../../store/state';

interface IProps {
    myPlaylist: IMyPlaylists,
    setMyPlaylist: React.Dispatch<React.SetStateAction<IMyPlaylists>>
}

export const FavoritePlaylistBackgroundWorker: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [favoritepageToken, setfavoritepageToken] = React.useState<string | undefined>(undefined);

    const favoritePlaylistId = "FL65Vblm8jhqYm8-0QPi3Z6A";

    React.useEffect(() => {
        if (state.youtubeState.userProfile.loaded) {
            if (!props.myPlaylist.loaded) {
                _fetchFavoritePlaylistItems();
            }
        }
    }, [state.youtubeState.userProfile.loaded]);

    React.useEffect(() => {
        if (favoritepageToken) {
            _fetchFavoritePlaylistItems(favoritepageToken);
        }
    }, [favoritepageToken]);

    async function _fetchFavoritePlaylistItems(pageToken: string | undefined = undefined) {
        try {
            props.setMyPlaylist((previous) => {
                return {
                    ...previous,
                    loading: true,
                    loaded: false
                }
            });

            var playlistItemsResponse = await new PlaylistItems(state.youtubeState.credential.accessToken).list({
                playlistId: favoritePlaylistId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
            });
            if (playlistItemsResponse && playlistItemsResponse.items && playlistItemsResponse.pageInfo?.totalResults) {

                const copy = { ...props.myPlaylist };

                var year: number | undefined;
                var month: number | undefined;
                var items: PlaylistItem[] = [];

                for (let index = 0; index < playlistItemsResponse.items.length; index++) {
                    const item = playlistItemsResponse.items[index];

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

                        const playlist = copy.playlists.find(p => p.year === year && p.month === month);
                        if (playlist) {
                            items.forEach(i => playlist.favoriteitems.push(i));
                        } else {
                            copy.playlists.push({
                                year: year,
                                month: month,
                                title: `Playlist ${year} - ${(month < 10) ? '0' : ''}${month}`,
                                favoriteitems: items,
                            })
                        }

                        year = currentYear;
                        month = currentMonth;
                        items = [item];
                    }
                }

                props.setMyPlaylist(copy);

                const lastItem = playlistItemsResponse.items[playlistItemsResponse.items.length - 1];

                // todo => removed in production mode
                if (lastItem.snippet?.publishedAt) {
                    const date = new Date(lastItem.snippet?.publishedAt);
                    const currentYear = date.getFullYear();

                    const limitYear = 2020;

                    if (currentYear < limitYear) {
                        playlistItemsResponse.nextPageToken = undefined;
                    }
                }

                if (playlistItemsResponse.nextPageToken) {
                    setfavoritepageToken(playlistItemsResponse.nextPageToken);
                } else {
                    setfavoritepageToken(undefined);
                    props.setMyPlaylist((previous) => {
                        return {
                            ...previous,
                            loading: false,
                            loaded: true
                        }
                    });
                }
            }
        } catch (error) {
            props.setMyPlaylist((previous) => {
                return {
                    ...previous,
                    loading: false,
                    loaded: false
                }
            });
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return (<></>)
}

export default FavoritePlaylistBackgroundWorker
