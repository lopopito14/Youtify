import React, { } from 'react'
import FavoritePlaylistBackgroundWorker from './favoritePlaylistBackgroundWorker';
import MonthPlaylistsBackgroundWorker from './monthPlaylistsBackgroundWorker';

interface IProps { }

export const BackgroundWorker: React.FunctionComponent<IProps> = () => {

    return (
        <>
            <FavoritePlaylistBackgroundWorker />
            <MonthPlaylistsBackgroundWorker />
        </>
    )
}

export default BackgroundWorker
