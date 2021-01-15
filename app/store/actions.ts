import { TNotificationsActions } from './types/notifications_types';
import { TSpotifyActions } from './types/spotify_actions';
import { TYoutubeActions } from './types/youtube_actions';

export type TActions = TYoutubeActions | TSpotifyActions | TNotificationsActions;