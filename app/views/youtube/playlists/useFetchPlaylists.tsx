import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Playlist } from '../../../youtubeApi/youtube-api-models';
import { Playlists } from '../../../youtubeApi/youtube-api-playlists';
import logger from '../../utils/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchPlaylists = () => {
    const { state, dispatch } = React.useContext(Context);

    const { log } = logger();

    const [loaded, setLoaded] = React.useState(false);
    const [playlists, setPlaylists] = React.useState<Playlist[]>([]);
    const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

    const fetchPlaylists = React.useCallback(async (pageTokenValue: string | undefined = undefined) => {
        try {
            const response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 10,
                pageToken: pageTokenValue
            });
            if (response && response.items) {
                if (pageTokenValue) {
                    setPlaylists(prev => {
                        if (response.items) {
                            return [...prev, ...response.items];
                        }

                        return prev;
                    });
                }
                else {
                    setPlaylists(response.items);
                }

                if (response.nextPageToken) {
                    setPageToken(response.nextPageToken);
                } else {
                    setLoaded(true);
                    setPageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }, [dispatch, state.youtubeState.credential.accessToken, state.youtubeState.userProfile.channelId]);

    React.useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

    const refreshPlaylist = React.useCallback(async () => {
        await fetchPlaylists();
    }, [fetchPlaylists]);

    const loadPlaylist = React.useCallback(async () => {
        if (!loaded) {
            await fetchPlaylists(pageToken);
        }
        else {
            log("all playlists loaded");
        }
    }, [fetchPlaylists, loaded, log, pageToken]);

    return { playlists, loaded, loadPlaylist, refreshPlaylist };
}

export default useFetchPlaylists;
