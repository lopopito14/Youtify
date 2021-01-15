import {Playlist, PlaylistItem} from '../youtubeApi/youtube-api-models';

export type TState = {
  spotifyState: IProfile<ISpotifyProfile>;
  youtubeState: IProfile<IYoutubeProfile>;
  myPlaylist: IMyPlaylist;
};

export interface IApplicationState {
  spotifyState: IProfile<ISpotifyProfile>;
  youtubeState: IProfile<IYoutubeProfile>;
  myPlaylist: IMyPlaylist;
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
  synchronized: boolean;
  favoriteitems: PlaylistItem[];
  youtube?: IYoutubePlaylist;
  spotify?: ISpotifyPlaylist;
}

export interface IYoutubePlaylist {
  playlist: Playlist;
  items: PlaylistItem[];
}

export interface ISpotifyPlaylist {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  items: SpotifyApi.PlaylistTrackObject[];
}

export interface ILoad {
  loading: boolean;
  loaded: boolean;
}
