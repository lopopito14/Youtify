import { Body, Button, Icon, Left, ListItem, Right, Spinner, Text, Thumbnail } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';
import RefreshableList from '../../utils/refreshableList';
import { spotifyTheme } from '../../theme';
import ArtistView from '../artist/artistView';
import useFetchArtists from './useFetchArtists';
import { ISpotifyNavigationProps, SpotifyViewType } from '../../../interfaces/spotifyInterfaces';

type IProps = ISpotifyNavigationProps

const ArtistsView: React.FunctionComponent<IProps> = (props: IProps) => {
    const { selectedView, setSelectedView } = props;

    const { followedArtists, loaded, loadArtists, refreshArtists } = useFetchArtists();
    const [selectedArtistId, setSelectedArtistId] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (selectedView === SpotifyViewType.ARTISTS) {
            setSelectedArtistId(undefined);
        }
    }, [selectedView]);

    const onOpenArtist = React.useCallback((id: string) => {
        setSelectedArtistId(id);
        setSelectedView(SpotifyViewType.ARTIST);
    }, [setSelectedView]);

    return (
        <>
            {
                selectedView === SpotifyViewType.ARTISTS &&
                <RefreshableList onRefresh={refreshArtists} backgroundColor={spotifyTheme.secondaryColor} lazyLoading onLoad={loadArtists}>
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
                                    <Text style={styles.titleStyle}>{p.name}</Text>
                                    <Text note numberOfLines={1}>popularity: {p.popularity}</Text>
                                    <Text note numberOfLines={1}>followers: {p.followers.total}</Text>
                                </Body>
                                <Right>
                                    <Button iconRight light onPress={() => onOpenArtist(p.id)}>
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
                selectedView === SpotifyViewType.ARTIST && selectedArtistId &&
                <ArtistView selectedView={selectedView} setSelectedView={setSelectedView} artistId={selectedArtistId} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        color: "white"
    }
});

export default ArtistsView;