import { TYoutubeCredentialsActions } from "./youtube_credential_types";
import { TYoutubePlaylistsActions } from "./youtube_playlists_types";
import { TYoutubeCurrentProfileActions } from "./youtube_userProfile_types";

export type TYoutubeActions = TYoutubeCredentialsActions | TYoutubeCurrentProfileActions | TYoutubePlaylistsActions;