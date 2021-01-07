import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import SpotifyApi from 'spotify-web-api-js';
import { Button, Text } from 'native-base';

interface Props { }

export const SpotifyPlaylists: React.FunctionComponent<Props> = () => {
    const [loadSpotifyPlaylists, setloadSpotifyPlaylists] = useState<boolean>(false);
    const [spotifyPlaylists, setspotifyPlaylists] = useState<globalThis.SpotifyApi.PlaylistObjectSimplified[]>([]);
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (loadSpotifyPlaylists) {
            fetchSpotifyPlaylists();
        } else {
            setspotifyPlaylists([]);
        }

        return () => {
            // do nothing
        };
    }, [loadSpotifyPlaylists]);

    async function fetchSpotifyPlaylists() {
        try {
            var spotifyApi = new SpotifyApi();
            spotifyApi.setAccessToken(state.spotifyState.credential.accessToken);

            var response = await spotifyApi.getUserPlaylists(
                'gb2dbwss2vvumq0rw8o64zgbc',
            );
            if (response) {
                setspotifyPlaylists(response.items);
            }
        } catch (error) {
            console.log('Error => ' + error);
        }
    }

    return (
        <>
            <Button
                onPress={() => setloadSpotifyPlaylists(!loadSpotifyPlaylists)}
                color={loadSpotifyPlaylists ? 'red' : 'green'}
            >
                <Text>{
                    loadSpotifyPlaylists
                        ? 'Unload Spotify playlists'
                        : 'Load Spotify playlists'
                }</Text>
            </Button>
            <>
                {spotifyPlaylists.map((p) => (
                    <Text key={p.name}>{p.name}</Text>
                ))}
            </>
        </>
    )
}
