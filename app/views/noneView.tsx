import { Content, Text } from "native-base";
import React from "react";

interface Props { }

export const NoneView: React.FunctionComponent<Props> = () => {

    return (
        <>
            <Content>
                <Text>Hello !</Text>
            </Content>
        </>
    )
}
