import { TSpotifyCredentialsActions } from './types/spotify_credential_types';
import { TYoutubeCredentialsActions } from './types/youtube_credential_types';

export type TActions = TYoutubeCredentialsActions | TSpotifyCredentialsActions;