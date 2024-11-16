import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {basisStyle, basisBtn} from '../styles/basisStyle';

interface IProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
  useConfDel(): void;
}

const ModalConfirm: React.FC<IProps> = ({
  setModalVisible,
  modalVisible,
  useConfDel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.center}>
        <View style={styles.container}>
          <Text style={styles.modalText}>Вы уверены что хотите удалить? </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[basisBtn.btn, basisBtn.btnDelete, styles.btn]}
              onPress={useConfDel}>
              <Text style={basisBtn.btnText}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[basisBtn.btnAdd, basisBtn.btn, styles.btn]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={basisBtn.btnText}>Нет</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirm;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    // iOS
    shadowColor: 'rgba(38, 36, 131, 0.25)', // Цвет тени
    shadowOffset: {
      width: 0, // Смещение по оси X
      height: 2, // Смещение по оси Y
    },
    shadowOpacity: 1, // Прозрачность
    shadowRadius: 10, // Радиус размытия
    // Android
    elevation: 5, // Задаем elevation, чтобы тень отображалась на Android
  },
  modalText: {
    marginBottom: 14,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#50555C'
  },
  btnContainer: {
    justifyContent: 'center',
    flexDirection: "row",
    gap: 36,
  },
  btn: {
    flex: 1
  }
});
