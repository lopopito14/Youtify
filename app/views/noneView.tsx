import { Content, Text } from "native-base";
import React from "react";

interface Props { }

const NoneView: React.FunctionComponent<Props> = () => {

    return (
        <>
            <Content>
                <Text>There is nothing here ;&#41;</Text>
            </Content>
        </>
    )
}

export default NoneView;