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

export interface ISpotifyProfile {
  country: string;
  displayName: string;
  email: string;
  id: string;
}

export interface IYoutubeProfile {
  title: string;
  channelId: string;
}

export interface ISpotifyPlaylist {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
}