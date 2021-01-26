import { ChannelListResponse } from '../../youtubeApi/youtube-api-models';
import { IYoutubeCurrentProfileError, IYoutubeCurrentProfileRequest, IYoutubeCurrentProfileSuccess, Types } from './youtube_userProfile_types';

export function youtubeCurrentProfileRequest(): IYoutubeCurrentProfileRequest {
    return {
        type: Types.YOUTUBE_CURRENT_PROFILE_REQUEST
    }
}

export function youtubeCurrentProfileSucess(result: ChannelListResponse): IYoutubeCurrentProfileSuccess {
    return {
        type: Types.YOUTUBE_CURRENT_PROFILE_SUCCEESS,
        payload: result
    }
}

export function youtubeCurrentProfileError(result: any): IYoutubeCurrentProfileError {
    return {
        type: Types.YOUTUBE_CURRENT_PROFILE_ERROR,
        payload: result
    }
}