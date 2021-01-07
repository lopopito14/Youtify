import { ActionCreator } from 'redux';
import { ChannelListResponse } from '../../youtubeApi/youtube-api-models';
import { IYoutubeCurrentProfileError, IYoutubeCurrentProfileRequest, IYoutubeCurrentProfileSuccess, Types } from './youtube_userProfile_types';

export const youtubeCurrentProfileRequest: ActionCreator<IYoutubeCurrentProfileRequest> = () => ({
    type: Types.YOUTUBE_CURRENT_PROFILE_REQUEST,
});

export const youtubeCurrentProfileSucess: ActionCreator<IYoutubeCurrentProfileSuccess> = (result: ChannelListResponse) => ({
    type: Types.YOUTUBE_CURRENT_PROFILE_SUCCEESS,
    payload: result
});

export const youtubeCurrentProfileError: ActionCreator<IYoutubeCurrentProfileError> = (result: any) => ({
    type: Types.YOUTUBE_CURRENT_PROFILE_ERROR,
    payload: result
});