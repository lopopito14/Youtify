import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base'
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../store/context';
import { ErrorResponseException, Subscription } from '../../youtubeApi/youtube-api-models';
import { Subscriptions } from '../../youtubeApi/youtube-api-subscriptions';
import { youtubeTheme } from '../theme';
import RefreshableList from '../utils/refreshableList';

export interface IProps {
    backgroundColor: string;
}

const SubscriptionsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const [subscriptions, setsubscriptions] = useState<Subscription[]>([]);
    const { state } = useContext(Context);
    const [loaded, setLoaded] = useState(false);
    const [pageToken, setpageToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

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
            if (error instanceof ErrorResponseException) {
                console.log(error.errorResponse.error.message);
            } else {
                console.log('Error => ' + error);
            }
        }
    }

    return (
        <RefreshableList onRefresh={onRefresh} backgroundColor={props.backgroundColor} lazyLoading={true} onLoad={onLoad}>
            {subscriptions.map((p, i) => (
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
            ))}
            {
                !loaded && <Spinner color={youtubeTheme.primaryColor} />
            }
        </RefreshableList>
    )
}

export default SubscriptionsView
