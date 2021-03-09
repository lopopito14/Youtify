import { Content, List } from 'native-base';
import React from 'react';
import { ScrollView, RefreshControl, NativeScrollEvent } from 'react-native'

interface IProps {
    children: React.ReactNode;
    // eslint-disable-next-line react/require-default-props
    lazyLoading?: boolean;
    onRefresh(): Promise<void>;
    onLoad(): Promise<void>;
    backgroundColor: string;
}

const RefreshableList: React.FunctionComponent<IProps> = (props: IProps) => {
    const { children, lazyLoading, onRefresh, onLoad, backgroundColor } = props;

    const onScroll = React.useCallback(async (event: NativeScrollEvent) => {
        const endPageReached = (e: NativeScrollEvent) => e.layoutMeasurement.height + e.contentOffset.y >= e.contentSize.height - 1;
        if (lazyLoading && endPageReached(event)) {
            await onLoad();
        }
    }, [lazyLoading, onLoad]);

    const onRefreshCallback = React.useCallback(async () => {
        await onRefresh();
    }, [onRefresh]);

    return (
        <ScrollView
            onScroll={({ nativeEvent: e }) => onScroll(e)}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor }}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefreshCallback}
                    colors={[backgroundColor]}
                    progressBackgroundColor="#ffffff"
                    progressViewOffset={-50}
                />
            }>
            <Content>
                <List>
                    {children}
                </List>
            </Content>
        </ScrollView>
    )
}

export default RefreshableList;