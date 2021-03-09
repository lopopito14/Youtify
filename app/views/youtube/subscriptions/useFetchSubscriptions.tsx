import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import { Subscriptions } from '../../../youtubeApi/youtube-api-subscriptions';
import logger from '../../utils/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFetchSubscriptions = () => {

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { state, dispatch } = React.useContext(Context);
    const { log } = logger();
    const [loaded, setLoaded] = React.useState(false);
    const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);
    const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const fetchSubscriptions = React.useCallback(async (pageTokenValue: string | undefined = undefined) => {

        try {
            const response = await new Subscriptions(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 20,
                pageToken: pageTokenValue,
                order: 'alphabetical'
            });
            if (response && response.items) {
                if (pageTokenValue) {
                    setSubscriptions(prev => {
                        if (response.items) {
                            return [...prev, ...response.items]
                        }
                        return prev;
                    });
                }
                else {
                    setSubscriptions(response.items);
                }

                if (response.nextPageToken) {
                    setPageToken(response.nextPageToken);
                } else {
                    setLoaded(true);
                    setPageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }, [dispatch, state.youtubeState.credential.accessToken, state.youtubeState.userProfile.channelId]);

    const refreshSubscriptions = React.useCallback(async () => {
        await fetchSubscriptions();
    }, [fetchSubscriptions]);

    const loadSubscriptions = React.useCallback(async () => {
        if (!loaded) {
            await fetchSubscriptions(pageToken);
        } else {
            log('all subscriptions loaded');
        }
    }, [fetchSubscriptions, loaded, log, pageToken]);

    /// ####### ///
    /// EFFECTS ///
    /// ####### ///
    React.useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    return { subscriptions, loaded, loadSubscriptions, refreshSubscriptions };
}

export default useFetchSubscriptions;