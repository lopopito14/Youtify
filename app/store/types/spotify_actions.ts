import { TSpotifyCredentialsActions } from './spotify_credential_types';
import { TSpotifyCurrentProfileActions } from './spotify_userProfile_types';

export type TSpotifyActions = TSpotifyCredentialsActions | TSpotifyCurrentProfileActions;