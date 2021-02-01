import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React from 'react';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import { youtubeTheme } from '../../theme';
import RefreshableList from '../../utils/refreshableList';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../youtubeView';
import SubscriptionView from '../subscription/subscriptionView';
import useFetchSubscriptions from './useFetchSubscriptions';

interface IProps extends IYoutubeNavigationProps { }

const SubscriptionsView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { subscriptions, loaded, loadSubscriptions, refreshSubscriptions } = useFetchSubscriptions();
    const [selectedSubscription, setselectedSubscription] = React.useState<Subscription | undefined>(undefined);

    React.useEffect(() => {
        if (props.selectedView === YoutubeViewType.SUBSCRIPTIONS) {
            setselectedSubscription(undefined);
        }
    }, [props.selectedView]);

    function _onOpenSubscription(subscription: Subscription) {
        setselectedSubscription(subscription);
        props.setselectedView(YoutubeViewType.SUBSCRIPTION);
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.SUBSCRIPTIONS &&
                <RefreshableList onRefresh={() => refreshSubscriptions()} backgroundColor={youtubeTheme.secondaryColor} lazyLoading={true} onLoad={() => loadSubscriptions()}>
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