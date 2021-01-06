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
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    },
    playlists: [],
    playlistItems: {},
  },
  youtubeState: {
    credential: {
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    },
    playlists: [],
    playlistItems: {},
  },
};

export interface ISpotifyState {
  credential: ICredential;
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  playlistItems: Record<string, SpotifyApi.PlaylistTrackObject[]>;
}

export interface IYoutubeState {
  credential: ICredential;
  playlists: Playlist[];
  playlistItems: Record<string, PlaylistItem[]>;
}

export interface ICredential {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationDate: string;
}
