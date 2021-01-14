import { Button, H1, Text, View } from 'native-base'
import React, { } from 'react'
import { Modal } from 'react-native'

export enum ModalType {
    OkCancel = 'OkCancel'
}

export interface IProps {
    title: string;
    type: ModalType,
    visible: boolean;
    backgroundColor: string;
    okCallback(): any;
    cancelCallback(): any;
}

const ModalPopup: React.FunctionComponent<IProps> = (props: IProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: props.backgroundColor
            }}>
                <View style={{
                    margin: 20,
                    backgroundColor: "white",
                    borderRadius: 20,
                    padding: 35,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.9,
                    shadowRadius: 3.84,
                    elevation: 50
                }}>
                    <H1 style={{
                        marginBottom: 20,
                        textAlign: "center"
                    }}>{props.title}</H1>

                    <View style={{ flexDirection: 'row' }}>
                        {
                            props.type === ModalType.OkCancel &&
                            <>
                                <Button rounded success onPress={props.okCallback} style={{ marginRight: 10 }}>
                                    <Text style={{
                                        textAlign: "left"
                                    }}>     Ok     </Text>
                                </Button>
                                <Button rounded danger onPress={props.cancelCallback} style={{ marginLeft: 10 }}>
                                    <Text style={{
                                        textAlign: "center"
                                    }}>Cancel</Text>
                                </Button>
                            </>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalPopup;
