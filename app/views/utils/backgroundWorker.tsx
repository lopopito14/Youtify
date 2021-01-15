import React, { } from 'react'
import FavoritePlaylistBackgroundWorker from './favoritePlaylistBackgroundWorker';
import PlaylistsBackgroundWorker from './playlistsBackgroundWorker';

interface IProps { }

export const BackgroundWorker: React.FunctionComponent<IProps> = () => {

    return (
        <>
            <FavoritePlaylistBackgroundWorker />
            <PlaylistsBackgroundWorker />
        </>
    )
}

export default BackgroundWorker
