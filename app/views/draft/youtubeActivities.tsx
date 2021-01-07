import { Button, Text } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import { Activities } from "../../youtubeApi/youtube-api-activities";
import { Activity, ErrorResponseException } from "../../youtubeApi/youtube-api-models";

interface Props { }

export const YoutubeActivities: React.FunctionComponent<Props> = () => {
    const [loadYoutubeActivities, setloadYoutubeActivities] = useState<boolean>(false);
    const [youtubeActivities, setyoutubeActivities] = useState<Activity[]>([]);
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (loadYoutubeActivities) {
            fetchActivities();
        } else {
            setyoutubeActivities([]);
        }
        return () => {
            // do nothing
        };
    }, [loadYoutubeActivities]);

    async function fetchActivities() {
        try {
            var response = await new Activities(state.youtubeState.credential.accessToken).list({
                mine: true,
                part: ['snippet', 'contentDetails', 'id'],
            });
            if (response && response.items) {
                setyoutubeActivities(response.items);
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
        <>
            <Button
                onPress={() => setloadYoutubeActivities(!loadYoutubeActivities)}
                color={loadYoutubeActivities ? 'red' : 'green'}
            >
                <Text>{
                    loadYoutubeActivities
                        ? 'Unload Youtube activities'
                        : 'Load Youtube activities'
                }</Text>
            </Button>
            <>
                {youtubeActivities.map((p) => (
                    <Text key={p.id}>{p.snippet?.channelTitle}</Text>
                ))}
            </>
        </>
    )
}
