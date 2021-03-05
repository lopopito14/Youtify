import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Playlist } from '../../../youtubeApi/youtube-api-models';
import { Playlists } from '../../../youtubeApi/youtube-api-playlists';

const useFetchPlaylists = () => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [playlists, setPlaylists] = React.useState<Playlist[]>([]);
    const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        fetchPlaylists();
    }, []);

    const refreshPlaylist = React.useCallback(async () => {
        await fetchPlaylists();
    }, []);

    const loadPlaylist = React.useCallback(async () => {
        if (!loaded) {
            await fetchPlaylists(pageToken);
        }
        else {
            console.log("all playlists loaded");
        }
    }, [loaded, pageToken]);

    const fetchPlaylists = async (pageToken: string | undefined = undefined) => {

        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 10,
                pageToken: pageToken
            });
            if (response && response.items) {
                if (pageToken) {
                    setPlaylists([...playlists, ...response.items]);
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
    }

    return { playlists, loaded, loadPlaylist, refreshPlaylist };
}

export default useFetchPlaylists;
