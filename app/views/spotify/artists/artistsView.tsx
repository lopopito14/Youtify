import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import React from 'react';
import RefreshableList from '../../utils/refreshableList';
import { spotifyTheme } from '../../theme';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../spotifyView';
import ArtistView from '../artist/artistView';
import useFetchArtists from './useFetchArtists';

interface IProps extends ISpotifyNavigationProps { }

const ArtistsView: React.FunctionComponent<IProps> = (props: IProps) => {

    const { followedArtists, loaded, loadArtists, refreshArtists } = useFetchArtists();
    const [selectedArtistId, setselectedArtistId] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (props.selectedView === SpotifyViewType.ARTISTS) {
            setselectedArtistId(undefined);
        }
    }, [props.selectedView]);

    function _onOpenArtist(id: string) {
        setselectedArtistId(id);
        props.setselectedView(SpotifyViewType.ARTIST);
    }

    return (
        <>
            {
                props.selectedView === SpotifyViewType.ARTISTS &&
                <RefreshableList onRefresh={() => refreshArtists()} backgroundColor={spotifyTheme.secondaryColor} lazyLoading={true} onLoad={() => loadArtists()}>
                    {
                        followedArtists.map((p) =>
                            <ListItem thumbnail key={p.id}>
                                <Left>
                                    {
                                        p.images && p.images.length >= 3 &&
                                        <Thumbnail source={{ uri: p.images[2].url }} />
                                    }
                                </Left>
                                <Body>
                                    <Text style={{ color: "white" }}>{p.name}</Text>
                                    <Text note numberOfLines={1}>popularity: {p.popularity}</Text>
                                    <Text note numberOfLines={1}>followers: {p.followers.total}</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => _onOpenArtist(p.id)}>
                                        <Text>Manage</Text>
                                        <Icon name='arrow-forward' />
                                    </Button>
                                </Right>
                            </ListItem>
                        )
                    }
                    {
                        !loaded && <Spinner color={spotifyTheme.primaryColor} />
                    }
                </RefreshableList>
            }
            {
                props.selectedView !== SpotifyViewType.ARTISTS && selectedArtistId &&
                <ArtistView selectedView={props.selectedView} setselectedView={props.setselectedView} artistId={selectedArtistId} />
            }
        </>
    )
}

export default ArtistsView
