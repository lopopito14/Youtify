import React from 'react';
import Context from '../../../store/context';
import { pushYoutubeErrorNotification } from '../../../store/types/notifications_actions';
import { SearchResult } from '../../../youtubeApi/youtube-api-models';
import { Search } from '../../../youtubeApi/youtube-api-search';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSearch = () => {
    const { state, dispatch } = React.useContext(Context);

    const [searchResults, setSearchResults] = React.useState<SearchResult[] | undefined>(undefined);

    const openSearch = async (query: string | undefined) => {
        if (!query) {
            setSearchResults(undefined);
            return;
        }
        try {
            const publishedBefore = undefined;
            const publishedAfter = undefined;

            /* if (adjustableVideo.video.snippet?.publishedAt) {
                const date = new Date(adjustableVideo.video.snippet?.publishedAt);
                const startDate = new Date(date.setMonth(date.getMonth() - 6));
                const endDate = new Date(date.setMonth(date.getMonth() + 12));

                publishedBefore = endDate.toISOString();
                publishedAfter = startDate.toISOString();

                publishedBefore = publishedBefore.slice(0, 19) + publishedBefore.slice(23);
                publishedAfter = publishedAfter.slice(0, 19) + publishedAfter.slice(23);
            } */

            const searchResponse = await new Search(state.youtubeState.credential.accessToken).list({
                maxResults: 10,
                publishedBefore,
                publishedAfter,
                part: ['snippet'],
                q: query
            });
            if (searchResponse && searchResponse.items) {
                setSearchResults(searchResponse.items);
            }
        } catch (error) {
            dispatch(pushYoutubeErrorNotification(error));
        }
    }

    return { searchResults, openSearch };
}

export default useSearch;