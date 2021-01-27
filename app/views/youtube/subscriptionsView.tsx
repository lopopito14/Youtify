import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React from 'react';
import Context from '../../store/context';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { Subscription } from '../../youtubeApi/youtube-api-models';
import { Subscriptions } from '../../youtubeApi/youtube-api-subscriptions';
import { youtubeTheme } from '../theme';
import RefreshableList from '../utils/refreshableList';
import { YoutubeViewType } from '../youtubeView';
import SubscriptionView from './subscriptionView';

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const SubscriptionsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [subscriptions, setsubscriptions] = React.useState<Subscription[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);
    const [selectedSubscription, setselectedSubscription] = React.useState<Subscription | undefined>(undefined);

    React.useEffect(() => {
        _fetchSubscriptions();
    }, []);

    React.useEffect(() => {
        if (props.selectedView === YoutubeViewType.SUBSCRIPTIONS) {
            setselectedSubscription(undefined);
        }
    }, [props.selectedView]);

    function _onRefresh() {
        _fetchSubscriptions();
    }

    function _onLoad() {
        if (!loaded) {
            _fetchSubscriptions(pageToken);
        }
        else {
            console.log("all subscriptions loaded");
        }
    }

    async function _fetchSubscriptions(pageToken: string | undefined = undefined) {
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

    function _onOpenSubscription(subscription: Subscription) {
        setselectedSubscription(subscription);
        props.setselectedView(YoutubeViewType.SUBSCRIPTION);
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.SUBSCRIPTIONS &&
                <RefreshableList onRefresh={_onRefresh} backgroundColor={youtubeTheme.secondaryColor} lazyLoading={true} onLoad={_onLoad}>
                    {
                        subscriptions.map((s, i) =>
                            <ListItem thumbnail key={i}>
                                <Left>
                                    {
                                        s.snippet?.thumbnails?.default?.url &&
                                        <Thumbnail source={{ uri: s.snippet?.thumbnails?.default?.url }} />
                                    }
                                </Left>
                                <Body>
                                    <Text style={{ color: "white" }}>{s.snippet?.title}</Text>
                                    <Text note numberOfLines={3}>{s.snippet?.description}</Text>
                                    <Text note numberOfLines={1}>{s.contentDetails?.totalItemCount} videos</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => _onOpenSubscription(s)}>
                                        <Text>Manage</Text>
                                        <Icon name='arrow-forward' />
                                    </Button>
                                </Right>
                            </ListItem>
                        )
                    }
                    {
                        !loaded && <Spinner color={youtubeTheme.primaryColor} />
                    }
                </RefreshableList>
            }
            {
                props.selectedView !== YoutubeViewType.SUBSCRIPTIONS && selectedSubscription &&
                <SubscriptionView selectedView={props.selectedView} setselectedView={props.setselectedView} subscription={selectedSubscription} />
            }
        </>
    )
}

export default SubscriptionsView
