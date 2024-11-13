import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch} from '../store/hooks';
import {updatePole, deletePole} from '../store/polesSlice';
import {PropsNavigation} from '../types/stackTypes';
import {IPole, IRepair} from '../types/storeTypes';

import ModalConfirm from '../components/ModalConfirm';
import ModalAddRepairs from '../components/ModalAddRepairs';
import ModalUpdateRepairs from '../components/ModalUpdateRepairs';
import RepairComponent from '../components/RepairComponent';
import StyledSwitch from '../components/StyledSwitch';

import {basisStyle, basisBtn} from '../styles/basisStyle';

const AddEditPoleScreen: React.FC<
  {
    route: any;
  } & PropsNavigation
> = ({route, navigation}) => {
  const dispatch = useAppDispatch();

  const {pole, addPole} = route.params || {};
  const [number, setNumber] = useState<string>(pole ? pole.number : '');
  const [repairs, setRepairs] = useState<IRepair[]>(pole ? pole.repairs : []);
  const [filterRepair, setFilterRepair] = useState<IRepair[]>();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleAddRepair, setModalVisibleAddRepair] =
    useState<boolean>(false);
  const [modalVisibleUpdateRepair, setModalVisibleUpdateRepair] =
    useState<boolean>(false);

  // функция создания ремонта
  const handleAddRepair = (dscr: string, urg: boolean) => {
    const newRepair: IRepair = {
      id: Date.now().toString(),
      description: dscr,
      urgent: urg, // Изначально пометка срочности выключена
      completed: false,
    };
    setRepairs(prev => [...prev, newRepair]);
  };

  const handleDeleteRepair = (id: string) => {
    setRepairs(repairs.filter(item => item.id !== id));
  };

  const handleCompleteRepair = (bool: boolean) => {
    setFilterRepair(repairs.filter(item => item.completed === bool));
  };
  useEffect(() => handleCompleteRepair(isCompleted), [isCompleted, repairs]);

  // функция сохранения ремонта опоры
  const handleSave = () => {
    const newPole: IPole = {
      id: pole ? pole.id : Date.now().toString(),
      number,
      repairs,
    };
    if (pole) {
      dispatch(updatePole(newPole));
    } else {
      addPole(newPole);
    }
  };

  // функция удаления
  const handleDelete = (id: string) => {
    dispatch(deletePole(id));
  };

  const updateUrgent = (itemId: string, urg: boolean) => {
    const updatedRepairs = repairs.map(repair =>
      repair.id === itemId ? {...repair, urgent: urg} : repair,
    );
    setRepairs(updatedRepairs);
  };

  const updateComplete = (item: IRepair) => {
    const updatedRepairs = repairs.map(repair =>
      repair.id === item.id
        ? {...repair, completed: !repair.completed}
        : repair,
    );
    setRepairs(updatedRepairs);
  };

  const updateRepair = (text: string, itemId: string) => {
    const updatedRepairs = repairs.map(repair =>
      repair.id === itemId ? {...repair, description: text} : repair,
    );
    setRepairs(updatedRepairs);
  };

  return (
    <View style={basisStyle.containerScreen}>
      <View style={styles.containerTop}>
        <TextInput
          placeholder="Номер опоры"
          value={number}
          onChangeText={setNumber}
          placeholderTextColor={'#BDBDBD'}
          style={basisStyle.textInp}
        />

        <TouchableOpacity
          style={[basisBtn.btn, basisBtn.btnAdd]}
          onPress={() => setModalVisibleAddRepair(true)}>
          <Text style={basisBtn.btnText}>Добавить ремонт</Text>
        </TouchableOpacity>

        <StyledSwitch setCompleted={setIsCompleted} />

        <View style={styles.listContainer}>
          <FlatList
            data={filterRepair}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View>
                <RepairComponent
                  repair={item}
                  setModalVisibleUpdateRepair={setModalVisibleUpdateRepair}
                  updateComplete={updateComplete}
                />
                <ModalUpdateRepairs
                  modalVisibleUpdateRepair={modalVisibleUpdateRepair}
                  setModalVisibleUpdateRepair={setModalVisibleUpdateRepair}
                  repair={item}
                  updateUrgent={updateUrgent}
                  updateRepair={updateRepair}
                />
              </View>
            )}
          />
        </View>
      </View>

      <View style={basisStyle.containerBtnBottom}>
        <TouchableOpacity
          style={[basisBtn.btn, basisBtn.btnSave]}
          onPress={() => {
            handleSave();
            navigation.navigate('Main');
          }}>
          <Text style={basisBtn.btnText}>Сохранить</Text>
        </TouchableOpacity>

        {pole && (
          <TouchableOpacity
            style={[basisBtn.btn, basisBtn.btnDelete]}
            onPress={() => {
              handleDelete(pole.id);
              navigation.navigate('Main');
            }}>
            <Text style={basisBtn.btnText}>Удалить</Text>
          </TouchableOpacity>
        )}
      </View>

      <ModalAddRepairs
        modalVisibleAddRepair={modalVisibleAddRepair}
        setModalVisibleAddRepair={setModalVisibleAddRepair}
        handleAddRepair={handleAddRepair}
      />
    </View>
  );
};

export default AddEditPoleScreen;

const styles = StyleSheet.create({
  containerTop: {
    gap: 16,
  },
  buttonAddRepair: {},
  listContainer: {
    maxHeight: 400,
  },
});
