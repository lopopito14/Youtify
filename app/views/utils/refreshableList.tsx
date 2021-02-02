import { Content, List } from 'native-base';
import React from 'react';
import { ScrollView, RefreshControl, NativeScrollEvent } from 'react-native'

interface IProps {
    children: React.ReactNode;
    lazyLoading?: boolean;
    onRefresh(): Promise<void>;
    onLoad(): Promise<void>;
    backgroundColor: string;
}

const RefreshableList: React.FunctionComponent<IProps> = (props: IProps) => {

    const onScroll = React.useCallback(async (e: NativeScrollEvent) => {
        const endPageReached = (e: NativeScrollEvent) => {
            return e.layoutMeasurement.height + e.contentOffset.y >= e.contentSize.height - 1;
        };
        if (props.lazyLoading && endPageReached(e)) {
            await props.onLoad();
        }
    }, [props.onLoad]);

    const onRefresh = React.useCallback(async () => {
        await props.onRefresh();
    }, [props.onRefresh]);

    return (
        <ScrollView
            onScroll={({ nativeEvent: e }) => onScroll(e)}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: props.backgroundColor }}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                    colors={[props.backgroundColor]}
                    progressBackgroundColor="#ffffff"
                    progressViewOffset={-50}
                />
            }>
            <Content>
                <List>
                    {props.children}
                </List>
            </Content>
        </ScrollView>
    )
}

export default RefreshableList
