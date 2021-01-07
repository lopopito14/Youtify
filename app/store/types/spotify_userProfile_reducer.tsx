import { Reducer } from 'redux';
import { TActions } from '../actions';
import { InitialState, ISpotifyProfile } from '../state';
import { TSpotifyCurrentProfileActions, Types } from './spotify_userProfile_types';

const reducer: Reducer<ISpotifyProfile, TActions> = (state: ISpotifyProfile = InitialState.spotifyState.userProfile, action: TActions) => {

    var spotifyAction = action as TSpotifyCurrentProfileActions;
    if (spotifyAction === null) {
        return state;
    }

    console.log(spotifyAction.type);

    switch (spotifyAction.type) {
        case Types.SPOTIFY_CURRENT_PROFILE_REQUEST:
            return state;

        case Types.SPOTIFY_CURRENT_PROFILE_SUCCEESS:
            return {
                ...state,
                country: spotifyAction.payload.country,
                displayName: spotifyAction.payload.display_name ? spotifyAction.payload.display_name : 'Not available',
                email: spotifyAction.payload.email,
                id: spotifyAction.payload.id,
            };

        case Types.SPOTIFY_CURRENT_PROFILE_ERROR:
            return state;

        default:
            return state;
    }
};

export default reducer;