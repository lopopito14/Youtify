import { Button, H1, Text, View } from 'native-base'
import React, { } from 'react'
import { Modal, ScrollView, StyleSheet } from 'react-native'

export enum ModalType {
    OK_CANCEL = 'OkCancel',
    CANCEL = 'Cancel'
}

interface IProps {
    title: string;
    type: ModalType,
    visible: boolean;
    backgroundColor: string;
    okCallback(): Promise<void>;
    cancelCallback(): Promise<void>;
    children?: React.ReactNode
}

const ModalPopup: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}>
            <View style={{ ...styles.modalStyle, backgroundColor: props.backgroundColor }}>
                <View style={styles.contentStyle}>
                    <H1 style={styles.titleStyle}>{props.title}</H1>
                    {
                        props.children &&
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                props.children
                            }
                        </ScrollView>
                    }
                    <View style={styles.viewButtonContainerStyle}>
                        {
                            props.type === ModalType.OK_CANCEL &&
                            <>
                                <Button rounded success onPress={props.okCallback} style={{ ...styles.buttonStyle, ...styles.leftButtonStyle }}>
                                    <Text>     Ok     </Text>
                                </Button>
                                <Button rounded danger onPress={props.cancelCallback} style={{ ...styles.buttonStyle, ...styles.rightButtonStyle }}>
                                    <Text>Cancel</Text>
                                </Button>
                            </>
                        }
                        {
                            props.type === ModalType.CANCEL &&
                            <>
                                <Button rounded danger onPress={props.cancelCallback} style={styles.buttonStyle}>
                                    <Text>Cancel</Text>
                                </Button>
                            </>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    contentStyle: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.9,
        shadowRadius: 3.84,
        elevation: 50,
        maxWidth: 400
    },
    titleStyle: {
        marginBottom: 10,
        textAlign: "center"
    },
    viewButtonContainerStyle: {
        marginTop: 10,
        flexDirection: 'row'
    },
    buttonStyle: {
        width: 85
    },
    leftButtonStyle: {
        marginRight: 10
    },
    rightButtonStyle: {
        marginLeft: 10
    }
});

export default ModalPopup;