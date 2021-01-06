import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import Context from '../../store/context';
import SpotifyApi from 'spotify-web-api-js';

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
        <View>
            <Button
                title={
                    loadSpotifyPlaylists
                        ? 'Unload Spotify playlists'
                        : 'Load Spotify playlists'
                }
                onPress={() => setloadSpotifyPlaylists(!loadSpotifyPlaylists)}
                color={loadSpotifyPlaylists ? 'red' : 'green'}
            />
            <>
                {spotifyPlaylists.map((p) => (
                    <Text key={p.name}>{p.name}</Text>
                ))}
            </>
        </View>
    )
}
