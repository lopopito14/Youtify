import {Playlist, PlaylistItem} from '../youtubeApi/youtube-api-models';

export type TState = {
  spotifyState: ISpotifyState;
  youtubeState: IYoutubeState;
};

export interface IApplicationState {
  spotifyState: ISpotifyState;
  youtubeState: IYoutubeState;
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
    },
    playlists: {
      loading: false,
      loaded: false,
      yearPlaylist: []
    }
  },
};

export interface ISpotifyState {
  credential: ICredential;
  userProfile: ISpotifyProfile;
  // spotifyPlaylist: ISpotifyPlaylist;
  // playlistItems: Record<string, SpotifyApi.PlaylistTrackObject[]>;
}

export interface IYoutubeState {
  credential: ICredential;
  userProfile: IYoutubeProfile;
  playlists: IYoutubePlaylists;
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

export interface ISpotifyPlaylist {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
}

export interface IYoutubePlaylists extends ILoad {
  yearPlaylist: IYoutubeYearPlaylist[];
}

export interface IYoutubeYearPlaylist {
  year: number;
  playlists: IYoutubeMonthPlaylist[];
}

export interface IYoutubeMonthPlaylist {
  month: number;
  playlistId?: string;
  synchronized: boolean;
  itemsFromFavorites: PlaylistItem[];
  items: PlaylistItem[];
}

export interface ILoad {
  loading: boolean;
  loaded: boolean;
}

export interface IProgress {
  progress: number;
}