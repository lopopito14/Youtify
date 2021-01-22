import React from 'react'
import { IMyPlaylists, ISpotifyPlaylists, IYoutubePlaylists } from '../../store/state';

interface IProps {
    myPlaylist: IMyPlaylists,
    setMyPlaylist: React.Dispatch<React.SetStateAction<IMyPlaylists>>,
    youtubePlaylists: IYoutubePlaylists,
    spotifyPlaylists: ISpotifyPlaylists,
}

export const PlaylistsDispatcher: React.FunctionComponent<IProps> = (props: IProps) => {

    React.useEffect(() => {
        if (props.myPlaylist.loaded && props.youtubePlaylists.loaded && props.spotifyPlaylists.loaded) {

            for (let i = 0; i < props.myPlaylist.playlists.length; i++) {
                const myPlaylist = props.myPlaylist.playlists[i];

                const youtubePlaylist = props.youtubePlaylists.playlists.find(p => p.snippet?.title === myPlaylist.title);
                const spotifyPlaylist = props.spotifyPlaylists.playlists.find(p => p.name === myPlaylist.title);

                props.setMyPlaylist((previous) => {
                    return {
                        ...previous,
                        playlists: [
                            ...previous.playlists.slice(0, i),
                            {
                                ...myPlaylist,
                                spotifyPlaylist: spotifyPlaylist,
                                youtubePlaylist: youtubePlaylist
                            },
                            ...previous.playlists.slice(i + 1),
                        ]
                    }
                });
            }
        }
    }, [props.myPlaylist.loaded, props.youtubePlaylists.loaded, props.spotifyPlaylists.loaded]);

    return (<></>)
}

export default PlaylistsDispatcher
