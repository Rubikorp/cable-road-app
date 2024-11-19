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

import {useMemo, useCallback} from 'react';

import {basisStyle, basisBtn} from '../styles/basisStyle';

import formatDate from '../utils/formatDate';

type TConfDel = {
  text: 'repair' | 'pole' | '';
  id: string;
};

const AddEditPoleScreen: React.FC<
  {
    route: any;
  } & PropsNavigation
> = ({route, navigation}) => {
  const dispatch = useAppDispatch();

  const {pole, addPole} = route.params || {};
  const [number, setNumber] = useState<string>(pole ? pole.number : '');
  const [repairs, setRepairs] = useState<IRepair[]>(pole ? pole.repairs : []);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [confDel, setConfDel] = useState<TConfDel>({
    text: '',
    id: '',
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleAddRepair, setModalVisibleAddRepair] =
    useState<boolean>(false);
  const [modalVisibleUpdateRepair, setModalVisibleUpdateRepair] =
    useState<boolean>(false);

  const filterRepair = useMemo((completed: boolean = false) => {
    return repairs.filter(item => item.completed === isCompleted);
  }, [isCompleted, repairs]);
  

  // функция создания ремонта
  const handleAddRepair = useCallback((dscr: string, urg: boolean) => {
    const newRepair: IRepair = {
      id: Date.now().toString(),
      description: dscr,
      urgent: urg,
      completed: false,
      date: formatDate(new Date()),
      dateComplete: '',
    };
    setRepairs(prev => [...prev, newRepair]);
  }, []);

  const handleDeleteRepair = (id: string) => {
    setRepairs(repairs.filter(item => item.id !== id));
  };

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

 

  const updateComplete = (item: IRepair) => {
    const updatedRepairs = repairs.map(repair => {
      if (repair.id === item.id) {
        const completed = !repair.completed;
        return {
          ...repair,
          completed,
          dateComplete: completed ? formatDate(new Date()) : '',
        };
      }
      return repair;
    });

    // Проверяем, изменилось ли состояние
    if (JSON.stringify(updatedRepairs) !== JSON.stringify(repairs)) {
      setRepairs(updatedRepairs);
    }
  };

  const updateRepair = (text: string, itemId: string, urg?: boolean) => {
    const updatedRepairs = repairs.map(repair => {
      if (repair.id === itemId) {
        return {
          ...repair,
          ...(text && { description: text }),
          ...(urg !== undefined && { urgent: urg })
        };
      }
      return repair;
    });
    setRepairs(updatedRepairs);
  };


  const useConfDel = () => {
    let {text, id} = confDel;
    if (text === 'pole') {
      handleDelete(id);
      navigation.navigate('Main');
    }
    text === 'repair' && handleDeleteRepair(id);
    setModalVisible(false);
  };

  const openConfModal = (text: 'pole' | 'repair', id: string) => {
    setModalVisible(true);
    setConfDel({text: text, id: id});
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

        <StyledSwitch setIsCompleted={setIsCompleted} isCompleted={isCompleted} />

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
                  openConfModal={openConfModal}
                />
                <ModalUpdateRepairs
                  modalVisibleUpdateRepair={modalVisibleUpdateRepair}
                  setModalVisibleUpdateRepair={setModalVisibleUpdateRepair}
                  repair={item}
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
              openConfModal('pole', pole.id);
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

      <ModalConfirm
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        useConfDel={useConfDel}
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
