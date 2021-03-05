import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import { Subscriptions } from '../../../youtubeApi/youtube-api-subscriptions';

const useFetchSubscriptions = () => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [subscriptions, setSubscriptions] = React.useState<Subscription[]>([]);
    const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        fetchSubscriptions();
    }, []);

    const refreshSubscriptions = React.useCallback(async () => {
        await fetchSubscriptions();
    }, []);

    const loadSubscriptions = React.useCallback(async () => {
        if (!loaded) {
            await fetchSubscriptions(pageToken);
        }
        else {
            console.log("all subscriptions loaded");
        }
    }, [loaded, pageToken]);

    const fetchSubscriptions = async (pageToken: string | undefined = undefined) => {
        try {
            var response = await new Subscriptions(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 20,
                pageToken: pageToken,
                order: 'alphabetical'
            });
            if (response && response.items) {
                if (pageToken) {
                    setSubscriptions([...subscriptions, ...response.items]);
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
    }

    return { subscriptions, loaded, loadSubscriptions, refreshSubscriptions };
}

export default useFetchSubscriptions;