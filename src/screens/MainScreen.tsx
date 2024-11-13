import React, {useState} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import {addPole} from '../store/polesSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {basisBtn, basisStyle} from '../styles/basisStyle';

import PoleComponent from '../components/PoleComponent';

const MainScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const poles = useAppSelector(state => state.poles.poles);

  // Состояние для поискового запроса
  const [searchQuery, setSearchQuery] = useState('');

  // Состояние для сортировки по номеру
  const [sortByNumberAsc, setSortByNumberAsc] = useState(true);

  // Состояние для сортировки по дате
  const [sortByDateAsc, setSortByDateAsc] = useState(true);

  // Функция для фильтрации опор и ремонтов
  const filteredPoles = poles.filter(
    pole =>
      pole.number.includes(searchQuery) ||
      pole.repairs.some(repair => repair.description.includes(searchQuery)),
  );

  // Функция для сортировки по номеру опоры
  const sortedPoles = filteredPoles.sort((a, b) => {
    const numberA = parseInt(a.number);
    const numberB = parseInt(b.number);
    return sortByNumberAsc ? numberA - numberB : numberB - numberA;
  });

  const handleAddPole = (newPole: {
    id: string;
    number: string;
    repairs: any[];
    photos: any[];
  }) => {
    dispatch(addPole(newPole));
  };

  return (
    <View style={basisStyle.containerScreen}>
      <View style={styles.containerTop}>
        <TextInput
          placeholder="Поиск..."
          placeholderTextColor={'#BDBDBD'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={basisStyle.textInp}
        />
        {/* Кнопки фильтрации */}
        <TouchableOpacity
          style={[basisBtn.btnSort, basisBtn.btn]}
          onPress={() => setSortByNumberAsc(!sortByNumberAsc)}>
          {' '}
          <Text style={basisBtn.btnText}>Сортировать</Text>
        </TouchableOpacity>

        <View style={styles.listContainer}>
          <FlatList
            data={sortedPoles} // Используем отсортированный массив
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <PoleComponent pole={item} navigation={navigation} />
            )}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[basisBtn.btn, basisBtn.btnSave]}
        onPress={() =>
          navigation.navigate('AddEditPole', {addPole: handleAddPole})
        }>
        {' '}
        <Text style={basisBtn.btnText}>Добавить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  containerTop: {
    gap: 16,
  },
  listContainer: {
    maxHeight: 500
  },
});
