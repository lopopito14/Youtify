import React from 'react';
import Context from '../../../store/context';
import { Channel, Playlist, Subscription } from '../../../youtubeApi/youtube-api-models';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { ChannelSections } from '../../../youtubeApi/youtube-api-channelSections';
import { Subscriptions } from '../../../youtubeApi/youtube-api-subscriptions';
import { Playlists } from '../../../youtubeApi/youtube-api-playlists';
import { Channels } from '../../../youtubeApi/youtube-api-channels';
import logger from '../../utils/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchSubscription = (subscription: Subscription) => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const { log } = logger();
    const [channelPlaylists, setChannelPlaylists] = React.useState<Playlist[]>([]);
    const [channelChannels, setChannelChannels] = React.useState<Channel[]>([]);
    const [channelSubscriptions, setChannelSubscriptions] = React.useState<Subscription[]>([]);
    const [loaded, setLoaded] = React.useState(false);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {

        const fetchChannelSections = async () => {
            try {
                const channelSectionsResponse = await new ChannelSections(state.youtubeState.credential.accessToken).list({
                    channelId: subscription.snippet?.resourceId?.channelId ? subscription.snippet.resourceId.channelId : '',
                    part: ['snippet', 'contentDetails']
                });
                if (channelSectionsResponse && channelSectionsResponse.items) {

                    const playlistIds: string[] = [];
                    const channelIds: string[] = [];

                    channelSectionsResponse.items.forEach(i => {
                        if (i.contentDetails?.playlists) {
                            i.contentDetails.playlists.forEach(p => playlistIds.push(p))
                        } else if (i.contentDetails?.channels) {
                            i.contentDetails.channels.forEach(c => channelIds.push(c))
                        }
                    });

                    const playlistsResponse = await new Playlists(state.youtubeState.credential.accessToken).list({
                        id: playlistIds,
                        part: ['snippet', 'contentDetails'],
                        maxResults: 10,
                    })
                    if (playlistsResponse && playlistsResponse.items) {
                        setChannelPlaylists(playlistsResponse.items);
                    }

                    const channelsResponse = await new Channels(state.youtubeState.credential.accessToken).list({
                        id: channelIds,
                        part: ['snippet', 'contentDetails'],
                        maxResults: 10,
                    })
                    if (channelsResponse && channelsResponse.items) {
                        setChannelChannels(channelsResponse.items);
                    }
                }
            } catch (error) {
                dispatch(pushYoutubeErrorNotification(error));
            }
        }

        const fetchSubscriptions = async () => {
            try {
                const response = await new Subscriptions(state.youtubeState.credential.accessToken).list({
                    channelId: subscription.snippet?.resourceId?.channelId ? subscription.snippet?.resourceId.channelId : '',
                    part: ['snippet', 'contentDetails'],
                    maxResults: 50,
                });
                if (response && response.items) {
                    setChannelSubscriptions(response.items);
                }
            } catch (error) {
                dispatch(pushYoutubeErrorNotification(error));
            }
        }

        const fetchAllChannelDatas = async () => {
            try {
                await Promise.all([fetchChannelSections(), fetchSubscriptions()]);
            } catch (e) {
                log(e);
            } finally {
                setLoaded(true);
            }
        }

        fetchAllChannelDatas();
    }, [dispatch, log, state.youtubeState.credential.accessToken, subscription]);

    return { channelPlaylists, channelChannels, channelSubscriptions, loaded };
}

export default useFetchSubscription;