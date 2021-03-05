import { Body, Card, CardItem, Content, H1, H2, Left, List, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { youtubeTheme } from '../../theme';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../youtubeView';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import useFetchSubscription from './useFetchSubscription';
import { StyleSheet } from 'react-native';

interface IProps extends IYoutubeNavigationProps {
    subscription: Subscription;
}

const SubscriptionView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { channelPlaylists, channelChannels, channelSubscriptions, loaded } = useFetchSubscription(props.subscription);

    return (
        <>
            {
                props.selectedView === YoutubeViewType.SUBSCRIPTION &&
                <Content style={styles.contentStyle}>
                    {
                        loaded && channelPlaylists &&
                        (<Card style={styles.cardStyle}>
                            <CardItem header style={styles.cardItemStyle}>
                                <Body>
                                    <H1>{props.subscription.snippet?.title}</H1>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                {
                                    props.subscription.snippet?.thumbnails?.high?.url &&
                                    <Thumbnail square source={{ uri: props.subscription.snippet?.thumbnails.high?.url }} style={styles.thumbnailStyle} />
                                }
                            </CardItem>
                            <CardItem bordered>
                                <Text note>{props.subscription.snippet?.description}</Text>
                            </CardItem>
                            <CardItem style={styles.cardItemStyle}>
                                <Body>
                                    <H2>{`Playlists (${channelPlaylists.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    channelPlaylists.map((item, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Left>
                                                {
                                                    item.snippet?.thumbnails?.default?.url &&
                                                    <Thumbnail source={{ uri: item.snippet?.thumbnails?.default?.url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text numberOfLines={1}>{item.snippet?.title}</Text>
                                                <Text note numberOfLines={1}>{item.snippet?.description}</Text>
                                            </Body>
                                            <Right>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                            <CardItem style={styles.cardItemStyle}>
                                <Body>
                                    <H2>{`Subscriptions (${channelSubscriptions.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    channelSubscriptions.map((s, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Left>
                                                {
                                                    s.snippet?.thumbnails?.default?.url &&
                                                    <Thumbnail source={{ uri: s.snippet?.thumbnails?.default?.url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text numberOfLines={1}>{s.snippet?.title}</Text>
                                                <Text note numberOfLines={1}>{s.snippet?.description}</Text>
                                            </Body>
                                            <Right>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                            <CardItem style={styles.cardItemStyle}>
                                <Body>
                                    <H2>{`Recommended (${channelChannels.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    channelChannels.map((c, i) =>
                                        <ListItem thumbnail key={i}>
                                            <Left>
                                                {
                                                    c.snippet?.thumbnails?.default?.url &&
                                                    <Thumbnail source={{ uri: c.snippet?.thumbnails?.default?.url }} />
                                                }
                                            </Left>
                                            <Body>
                                                <Text numberOfLines={1}>{c.snippet?.title}</Text>
                                                <Text note numberOfLines={1}>{c.snippet?.description}</Text>
                                            </Body>
                                            <Right>
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Card>)
                    }
                    {
                        !loaded && <Spinner color={youtubeTheme.primaryColor} />
                    }
                </Content>
            }
        </>
    )
}

const styles = StyleSheet.create({
    contentStyle: {
        backgroundColor: youtubeTheme.secondaryColor,
    },
    cardStyle: {
        margin: 5
    },
    cardItemStyle: {
        backgroundColor: youtubeTheme.secondaryBackgroundColor
    },
    thumbnailStyle: {
        height: 320,
        flex: 1
    }
});

export default SubscriptionView;