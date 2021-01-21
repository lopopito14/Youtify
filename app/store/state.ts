import {Playlist, PlaylistItem, Video} from '../youtubeApi/youtube-api-models';

export type TState = {
  spotifyState: IProfile<ISpotifyProfile>;
  youtubeState: IProfile<IYoutubeProfile>;
  myPlaylist: IMyPlaylist;
  notifications: INotifications;
};

export interface IApplicationState {
  spotifyState: IProfile<ISpotifyProfile>;
  youtubeState: IProfile<IYoutubeProfile>;
  myPlaylist: IMyPlaylist;
  notifications: INotifications;
}

export const InitialState: TState = {
  spotifyState: {
    credential: {
      isLogged: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    },
    userProfile: {
      loading: false,
      loaded: false,
      country: '',
      displayName: '',
      email: '',
      id: ''
    }
  },
  youtubeState: {
    credential: {
      isLogged: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    },
    userProfile: {
      loading: false,
      loaded: false,
      title: '',
      channelId: ''
    }
  },
  myPlaylist: {
    loaded: false,
    loading: false,
    myPlaylists: []
  },
  notifications: {
    notifications: []
  }
};

export interface IProfile<T> {
  credential: ICredential;
  userProfile: T;
}

export interface ICredential {
  isLogged: boolean;
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationDate: string;
}

export interface ISpotifyProfile extends ILoad {
  country: string;
  displayName: string;
  email: string;
  id: string;
}

export interface IYoutubeProfile extends ILoad {
  title: string;
  channelId: string;
}

export interface IMyPlaylist extends ILoad {
  myPlaylists: IYoutubeMonthPlaylist[];
}

export interface IYoutubeMonthPlaylist {
  year: number,
  month: number;
  title: string;
  favoriteitems: PlaylistItem[];
  youtube?: IYoutubePlaylist;
  spotify?: ISpotifyPlaylist;
}

export interface IYoutubePlaylist {
  playlist: Playlist;
  videos: Video[];
}

export interface ISpotifyPlaylist {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
}

export interface ILoad {
  loading: boolean;
  loaded: boolean;
}

export interface INotifications {
  notifications: INotification[];
}

export interface INotification {
  message: string;
  type: NotificationType;
}

export enum NotificationType {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
}