import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React from 'react';
import { StyleSheet } from 'react-native';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../../interfaces/youtubeInterfaces';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import { youtubeTheme } from '../../theme';
import RefreshableList from '../../utils/refreshableList';
import SubscriptionView from '../subscription/subscriptionView';
import useFetchSubscriptions from './useFetchSubscriptions';

type IProps = IYoutubeNavigationProps

const SubscriptionsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { selectedView, setSelectedView } = props;

    const { subscriptions, loaded, loadSubscriptions, refreshSubscriptions } = useFetchSubscriptions();
    const [selectedSubscription, setSelectedSubscription] = React.useState<Subscription | undefined>(undefined);

    React.useEffect(() => {
        if (selectedView === YoutubeViewType.SUBSCRIPTIONS) {
            setSelectedSubscription(undefined);
        }
    }, [selectedView]);

    const onOpenSubscription = React.useCallback((subscription: Subscription) => {
        setSelectedSubscription(subscription);
        setSelectedView(YoutubeViewType.SUBSCRIPTION);
    }, [setSelectedView]);

    return (
        <>
            {
                selectedView === YoutubeViewType.SUBSCRIPTIONS &&
                <RefreshableList onRefresh={refreshSubscriptions} backgroundColor={youtubeTheme.secondaryColor} lazyLoading onLoad={loadSubscriptions}>
                    {
                        subscriptions.map((s) =>
                            <ListItem thumbnail key={s.id}>
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
                selectedView === YoutubeViewType.SUBSCRIPTION && selectedSubscription &&
                <SubscriptionView selectedView={selectedView} setSelectedView={setSelectedView} subscription={selectedSubscription} />
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