import React from 'react';
import Context from '../../store/context';
import { pushSpotifyErrorNotification } from '../../store/types/notifications_actions';
import SpotifyApi from 'spotify-web-api-js';
import { ILoad } from '../../store/state';

export interface ISearch extends ILoad {
    searchResults: globalThis.SpotifyApi.TrackObjectFull[]
}

const useSearch = () => {
    const { state, dispatch } = React.useContext(Context);

    const [searchResults, setSearchResults] = React.useState<ISearch>({
        loading: false,
        loaded: true,
        searchResults: []
    });

    const openSearch = async (query: string | undefined) => {
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

            var searchTracksResponse = await spotifyApi.searchTracks(query, options);
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
    }

    return { searchResults, openSearch };
}

export default useSearch
