import { Button, H1, Text, View } from 'native-base'
import React, { } from 'react'
import { Modal, ScrollView } from 'react-native'

export enum ModalType {
    OK_CANCEL = 'OkCancel',
    CANCEL = 'Cancel'
}

export interface IProps {
    title: string;
    type: ModalType,
    visible: boolean;
    backgroundColor: string;
    okCallback(): any;
    cancelCallback(): any;
    children?: React.ReactNode
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
                    paddingVertical: 15,
                    paddingHorizontal: 5,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.9,
                    shadowRadius: 3.84,
                    elevation: 50,
                    maxWidth: 400
                }}>
                    <H1 style={{
                        marginBottom: 10,
                        textAlign: "center"
                    }}>{props.title}</H1>
                    {
                        props.children &&

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                props.children
                            }
                        </ScrollView>
                    }
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        {
                            props.type === ModalType.OK_CANCEL &&
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
                        {
                            props.type === ModalType.CANCEL &&
                            <>
                                <Button rounded danger onPress={props.cancelCallback}>
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
