import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import Context from '../../store/context';
import { pushYoutubeErrorNotification } from '../../store/types/notifications_actions';
import { Playlist } from '../../youtubeApi/youtube-api-models';
import { Playlists } from '../../youtubeApi/youtube-api-playlists';
import { youtubeTheme } from '../theme';
import RefreshableList from '../utils/refreshableList';
import { YoutubeViewType } from '../youtubeView';
import PlaylistView from './playlistView';

export interface IProps {
    selectedView: YoutubeViewType;
    setselectedView(view: YoutubeViewType): any;
}

const PlaylistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { state, dispatch } = React.useContext(Context);

    const [loaded, setLoaded] = React.useState(false);
    const [playlists, setplaylists] = React.useState<Playlist[]>([]);
    const [pageToken, setpageToken] = React.useState<string | undefined>(undefined);
    const [selectedPlaylist, setselectedPlaylist] = React.useState<Playlist | undefined>(undefined);

    React.useEffect(() => {
        _fetchPlaylists();
    }, []);

    React.useEffect(() => {
        if (props.selectedView === YoutubeViewType.PLAYLISTS) {
            setselectedPlaylist(undefined);
        }
    }, [props.selectedView]);

    function _onRefresh() {
        _fetchPlaylists();
    }

    function _onLoad() {
        if (!loaded) {
            _fetchPlaylists(pageToken);
        }
        else {
            console.log("all playlists loaded");
        }
    }

    async function _fetchPlaylists(pageToken: string | undefined = undefined) {
        try {
            var response = await new Playlists(state.youtubeState.credential.accessToken).list({
                channelId: state.youtubeState.userProfile.channelId,
                part: ['snippet', 'contentDetails'],
                maxResults: 10,
                pageToken: pageToken
            });
            if (response && response.items) {
                if (pageToken) {
                    setplaylists([...playlists, ...response.items]);
                }
                else {
                    setplaylists(response.items);
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

    function _onOpenPlaylist(playlist: Playlist) {
        setselectedPlaylist(playlist);
        props.setselectedView(YoutubeViewType.PLAYLIST);
    }

    return (
        <>
            {
                props.selectedView === YoutubeViewType.PLAYLISTS &&
                <RefreshableList onRefresh={_onRefresh} backgroundColor={youtubeTheme.secondaryColor} lazyLoading={true} onLoad={_onLoad}>
                    {
                        playlists.map((p, i) =>
                            <ListItem thumbnail key={i}>
                                <Left>
                                    {
                                        p.snippet?.thumbnails?.high?.url &&
                                        <Thumbnail source={{ uri: p.snippet?.thumbnails?.high?.url }} />
                                    }
                                </Left>
                                <Body>
                                    <Text style={{ color: "white" }}>{p.snippet?.title}</Text>
                                    <Text note numberOfLines={1}>{p.contentDetails?.itemCount} videos.</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => _onOpenPlaylist(p)}>
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
                props.selectedView !== YoutubeViewType.PLAYLISTS && selectedPlaylist &&
                <PlaylistView selectedView={props.selectedView} setselectedView={props.setselectedView} playlist={selectedPlaylist} />
            }
        </>
    )
}

export default PlaylistsView
