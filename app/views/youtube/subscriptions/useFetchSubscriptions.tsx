import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import { Subscriptions } from '../../../youtubeApi/youtube-api-subscriptions';

const useFetchSubscriptions = () => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [subscriptions, setsubscriptions] = React.useState<Subscription[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);

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
                    setsubscriptions([...subscriptions, ...response.items]);
                }
                else {
                    setsubscriptions(response.items);
                }

                if (response.nextPageToken) {
                    setpageToken(response.nextPageToken);
                } else {
                    setLoaded(true);
                    setpageToken(undefined);
                }
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return { subscriptions, loaded, loadSubscriptions, refreshSubscriptions };
}

export default useFetchSubscriptions
