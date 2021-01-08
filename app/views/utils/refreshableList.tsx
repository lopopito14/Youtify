import { Content, List } from 'native-base'
import React, { ReactNode } from 'react'
import { ScrollView, RefreshControl, NativeScrollEvent } from 'react-native'

interface IProps {
    children: ReactNode;
    lazyLoading?: boolean;
    onRefresh(): void;
    onLoad(): void;
    backgroundColor: string;
}

const RefreshableList: React.FunctionComponent<IProps> = (props: IProps) => {

    const endPageReached = (e: NativeScrollEvent) => {
        return e.layoutMeasurement.height + e.contentOffset.y >= e.contentSize.height - 1;
    };

    function onScroll(e: NativeScrollEvent) {
        if (props.lazyLoading && endPageReached(e)) {
            props.onLoad();
        }
    }

    return (
        <ScrollView
            onScroll={({ nativeEvent: e }) => onScroll(e)}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: props.backgroundColor }}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={props.onRefresh}
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
