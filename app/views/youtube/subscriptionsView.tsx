import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { Subscription } from '../../youtubeApi/youtube-api-models';
import { Subscriptions } from '../../youtubeApi/youtube-api-subscriptions';
import { youtubeTheme } from '../theme';
import RefreshableList from '../utils/refreshableList';
import { YoutubeViewType } from '../youtubeView';

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const SubscriptionsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [subscriptions, setsubscriptions] = useState<Subscription[]>([]);
    const { state, dispatch } = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [pageToken, setpageToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    // useEffect(() => {
    //     if (props.selectedView === YoutubeViewType.Subscriptions) {
    //         setpageToken(undefined);
    //     }
    // }, [props.selectedView]);

    function onRefresh() {
        fetchSubscriptions();
    }

    function onLoad() {
        if (!loaded) {
            fetchSubscriptions(pageToken);
        }
        else {
            console.log("all subscriptions loaded");
        }
    }

    async function fetchSubscriptions(pageToken: string | undefined = undefined) {
        try {
            var response = await new Subscriptions(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 50,
                pageToken: pageToken
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

    return (
        <>
            {
                props.selectedView === YoutubeViewType.Subscriptions &&
                <RefreshableList onRefresh={onRefresh} backgroundColor={youtubeTheme.secondaryColor} lazyLoading={true} onLoad={onLoad}>
                    {
                        subscriptions.map((p, i) =>
                            <ListItem thumbnail key={i}>
                                <Left>
                                    {
                                        p.snippet?.thumbnails?.default?.url &&
                                        <Thumbnail source={{ uri: p.snippet?.thumbnails?.default?.url }} />
                                    }
                                </Left>
                                <Body>
                                    <Text style={{ color: "white" }}>{p.snippet?.title}</Text>
                                    <Text note numberOfLines={3}>{p.snippet?.description}</Text>
                                    <Text note numberOfLines={1}>{p.contentDetails?.totalItemCount} videos</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light>
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
        </>
    )
}

export default SubscriptionsView
