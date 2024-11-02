import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import React, {Dispatch, SetStateAction} from 'react'
import { IRepair } from '../types/storeTypes';

interface IProps {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    handleDeleteRepair(item:string): void;
    modalVisible: boolean;
    itemId: string;
}

const ModalConfirm: React.FC<IProps> = ({setModalVisible, modalVisible, itemId, handleDeleteRepair}) => {
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Подтвердите удаление ремонта</Text>
        <Pressable
        style={[styles.button, styles.buttonClose]}
          onPress={() => {
            setModalVisible(!modalVisible)
            handleDeleteRepair(itemId)
            }}>
          <Text>Да</Text>
        </Pressable>
        <Pressable
        style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text>Нет</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  )
}

export default ModalConfirm

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})