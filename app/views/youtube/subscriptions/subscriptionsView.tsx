import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React from 'react';
import { StyleSheet } from 'react-native';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import { youtubeTheme } from '../../theme';
import RefreshableList from '../../utils/refreshableList';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../youtubeView';
import SubscriptionView from '../subscription/subscriptionView';
import useFetchSubscriptions from './useFetchSubscriptions';

interface IProps extends IYoutubeNavigationProps { }

const SubscriptionsView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { subscriptions, loaded, loadSubscriptions, refreshSubscriptions } = useFetchSubscriptions();
    const [selectedSubscription, setSelectedSubscription] = React.useState<Subscription | undefined>(undefined);

    React.useEffect(() => {
        if (props.selectedView === YoutubeViewType.SUBSCRIPTIONS) {
            setSelectedSubscription(undefined);
        }
    }, [props.selectedView]);

    const onOpenSubscription = React.useCallback((subscription: Subscription) => {
        setSelectedSubscription(subscription);
        props.setSelectedView(YoutubeViewType.SUBSCRIPTION);
    }, []);

    return (
        <>
            {
                props.selectedView === YoutubeViewType.SUBSCRIPTIONS &&
                <RefreshableList onRefresh={refreshSubscriptions} backgroundColor={youtubeTheme.secondaryColor} lazyLoading={true} onLoad={loadSubscriptions}>
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
                                    <Text style={styles.titleStyle}>{s.snippet?.title}</Text>
                                    <Text note numberOfLines={3}>{s.snippet?.description}</Text>
                                    <Text note numberOfLines={1}>{s.contentDetails?.totalItemCount} videos</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => onOpenSubscription(s)}>
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
                <SubscriptionView selectedView={props.selectedView} setSelectedView={props.setSelectedView} subscription={selectedSubscription} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        color: "white"
    }
});

export default SubscriptionsView;