import { ILoad } from "../store/state";
import { Playlist, PlaylistItem } from "../youtubeApi/youtube-api-models";

export enum SynchronizeViewType {
    SYNCHRONIZE,
    SYNCHRONIZE_PLAYLIST
}

export interface ISynchronizeNavigationProps {
    selectedView: SynchronizeViewType;
    setSelectedView(view: SynchronizeViewType): void;
}

export interface IMyPlaylists extends ILoad {
    playlists: IYoutubeMonthPlaylist[];
}

export interface IYoutubeMonthPlaylist {
    year: number,
    month: number;
    title: string;
    favoriteitems: PlaylistItem[];
    youtubePlaylist?: Playlist;
    spotifyPlaylist?: globalThis.SpotifyApi.PlaylistObjectSimplified;
}