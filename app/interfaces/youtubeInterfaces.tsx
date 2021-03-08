import { PlaylistItem, Video } from "../youtubeApi/youtube-api-models";

export enum YoutubeViewType {
    MENU,
    PLAYLISTS,
    PLAYLIST,
    SUBSCRIPTIONS,
    SUBSCRIPTION,
    ADJUST_FAVORITES
}

export interface IYoutubeNavigationProps {
    selectedView: YoutubeViewType;
    setSelectedView(view: YoutubeViewType): void;
}

export interface IAdjustableVideo {
    playlistItem: PlaylistItem;
    video: Video;
}
