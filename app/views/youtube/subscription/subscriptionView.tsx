import { Body, Card, CardItem, Content, H1, H2, Left, List, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { youtubeTheme } from '../../theme';
import { Subscription } from '../../../youtubeApi/youtube-api-models';
import useFetchSubscription from './useFetchSubscription';
import { IYoutubeNavigationProps, YoutubeViewType } from '../../../interfaces/youtubeInterfaces';

interface IProps extends IYoutubeNavigationProps {
    subscription: Subscription;
}

const SubscriptionView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { subscription, selectedView } = props;

    /// ###### ///
    /// STATES ///
    /// ###### ///
    const { channelPlaylists, channelChannels, channelSubscriptions, loaded } = useFetchSubscription(subscription);

    /// ######### ///
    /// CALLBACKS ///
    /// ######### ///
    const isSelected = React.useCallback((view: YoutubeViewType) => selectedView === view, [selectedView]);

    return (
        <>
            {
                isSelected(YoutubeViewType.SUBSCRIPTION) &&
                <Content style={styles.contentStyle}>
                    {
                        loaded && channelPlaylists &&
                        (<Card style={styles.cardStyle}>
                            <CardItem header style={styles.cardItemStyle}>
                                <Body>
                                    <H1>{subscription.snippet?.title}</H1>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                {
                                    subscription.snippet?.thumbnails?.high?.url &&
                                    <Thumbnail square source={{ uri: subscription.snippet?.thumbnails.high?.url }} style={styles.thumbnailStyle} />
                                }
                            </CardItem>
                            <CardItem bordered>
                                <Text note>{subscription.snippet?.description}</Text>
                            </CardItem>
                            <CardItem style={styles.cardItemStyle}>
                                <Body>
                                    <H2>{`Playlists (${channelPlaylists.length})`}</H2>
                                </Body>
                            </CardItem>
                            <List>
                                {
                                    channelPlaylists.map((item) =>
                                        <ListItem thumbnail key={item.id}>
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
                                            <Right />
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
                                    channelSubscriptions.map((s) =>
                                        <ListItem thumbnail key={s.id}>
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
                                            <Right />
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
                                    channelChannels.map((c) =>
                                        <ListItem thumbnail key={c.id}>
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
                                            <Right />
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