import { IPopNotification, IPushSpotifyErrorNotification, IPushSpotifySuccessNotification, IPushSpotifyWarningNotification, IPushYoutubeErrorNotification, IPushYoutubeSuccessNotification, IPushYoutubeWarningNotification, Types } from './notifications_types';

export function pushYoutubeSuccessNotification(result: string) : IPushYoutubeSuccessNotification {
    return {
        type: Types.PUSH_YOUTUBE_SUCCESS_NOTIFICATION,
        payload: result
    }
};

export function pushYoutubeWarningNotification(result: string): IPushYoutubeWarningNotification {
    return {
        type: Types.PUSH_YOUTUBE_WARNING_NOTIFICATION,
        payload: result
    }
}

export function pushYoutubeErrorNotification(result: any): IPushYoutubeErrorNotification {
    return {
        type: Types.PUSH_YOUTUBE_ERROR_NOTIFICATION,
        payload: result
    }
}

export function popNotification(): IPopNotification {
    return {
        type: Types.POP_NOTIFICATION
    }
}

export function pushSpotifySuccessNotification(result: string): IPushSpotifySuccessNotification {
    return {
        type: Types.PUSH_SPOTIFY_SUCCESS_NOTIFICATION,
        payload: result
    }
}

export function pushSpotifyWarningNotification(result: string): IPushSpotifyWarningNotification {
    return {
        type: Types.PUSH_SPOTIFY_WARNING_NOTIFICATION,
        payload: result
    }
}

export function pushSpotifyErrorNotification(result: any): IPushSpotifyErrorNotification {
    return {
        type: Types.PUSH_SPOTIFY_ERROR_NOTIFICATION,
        payload: result
    }
}