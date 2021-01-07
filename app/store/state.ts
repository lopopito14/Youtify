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
      isLoading: false,
      country: '',
      displayName: '',
      email: '',
      id: ''
    },
    // spotifyPlaylist: {
    //   playlists: [],
    // },
    // playlistItems: {},
  },
  youtubeState: {
    credential: {
      isLogged: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    },
    userProfile: {
      isLoading: false,
      title: '',
      channelId: ''
    },
    //playlists: [],
    //playlistItems: {},
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
  // playlists: Playlist[];
  // playlistItems: Record<string, PlaylistItem[]>;
}

export interface ICredential {
  isLogged: boolean;
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationDate: string;
}

export interface ISpotifyProfile extends ILoading {
  country: string;
  displayName: string;
  email: string;
  id: string;
}

export interface IYoutubeProfile extends ILoading {
  title: string;
  channelId: string;
}

export interface ISpotifyPlaylist {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
}

export interface ILoading {
  isLoading: boolean;
}