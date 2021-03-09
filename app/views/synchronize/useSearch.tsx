import React from 'react';
import SpotifyApi from 'spotify-web-api-js';
import Context from '../../store/context';
import { pushSpotifyErrorNotification } from '../../store/types/notifications_actions';
import { ILoad } from '../../store/state';

export interface ISearch extends ILoad {
    searchResults: globalThis.SpotifyApi.TrackObjectFull[]
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSearch = () => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const [searchResults, setSearchResults] = React.useState<ISearch>({
        loading: false,
        loaded: true,
        searchResults: []
    });

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const openSearch = React.useCallback(async (query: string | undefined) => {
        if (!query) {
            setSearchResults({
                loaded: true,
                loading: false,
                searchResults: []
            });
            return;
        }
        try {

            setSearchResults({
                loaded: false,
                loading: true,
                searchResults: []
            });

            const spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            const options: globalThis.SpotifyApi.SearchForItemParameterObject = {
                limit: 10
            };

            const searchTracksResponse = await spotifyApi.searchTracks(query, options);
            if (searchTracksResponse) {
                setSearchResults({
                    loaded: true,
                    loading: false,
                    searchResults: searchTracksResponse.tracks.items
                });
            }
        } catch (error) {
            dispatch(pushSpotifyErrorNotification(error));
            setSearchResults({
                loaded: true,
                loading: false,
                searchResults: []
            });
        }
    }, [dispatch, state.spotifyState.credential.accessToken]);

    return { searchResults, openSearch };
}

export default useSearch;