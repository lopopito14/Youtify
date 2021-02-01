import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Playlist } from '../../../youtubeApi/youtube-api-models';
import { Playlists } from '../../../youtubeApi/youtube-api-playlists';

const useFetchPlaylists = () => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [playlists, setplaylists] = React.useState<Playlist[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        _fetchPlaylists();
    }, []);

    function refreshPlaylist() {
        _fetchPlaylists();
    }

    function loadPlaylist() {
        if (!loaded) {
            _fetchPlaylists(pageToken);
        }
        else {
            console.log("all playlists loaded");
        }
    }

    async function _fetchPlaylists(pageToken: string | undefined = undefined) {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 10,
                pageToken: pageToken
            });
            if (response && response.items) {
                if (pageToken) {
                    setplaylists([...playlists, ...response.items]);
                }
                else {
                    setplaylists(response.items);
                }

                if (response.nextPageToken) {
                    setpageToken(response.nextPageToken);
                } else {
                    setLoaded(true);
                    setpageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return { playlists, loaded, loadPlaylist, refreshPlaylist };
}

export default useFetchPlaylists
