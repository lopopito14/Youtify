export enum SpotifyViewType {
    MENU,
    PLAYLISTS,
    PLAYLIST,
    ARTISTS,
    ARTIST
}

export interface ISpotifyNavigationProps {
    selectedView: SpotifyViewType;
    setSelectedView(view: SpotifyViewType): void;
}