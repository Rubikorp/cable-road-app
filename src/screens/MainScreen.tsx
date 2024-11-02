import React, {useState} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {addPole} from '../store/polesSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import styles from '../styles/MainScreenStyle';

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
    <View style={styles.container}>
      <TextInput
        placeholder="Поиск по номеру опоры"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      {/* Кнопки фильтрации */}
      <View style={styles.filterButtonsContainer}>
        <Button
          title={`Сортировать по номеру ${
            sortByNumberAsc ? 'убыванию' : 'возрастанию'
          }`}
          onPress={() => setSortByNumberAsc(!sortByNumberAsc)}
        />
      </View>

      <FlatList
        data={sortedPoles} // Используем отсортированный массив
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddEditPole', {pole: item})}
            style={styles.itemContainer}>
            <View style={styles.numberBox}>
              <Image
                source={require('../img/pole.png')}
                style={{width: 10, height: 20}}
              />
              <Text style={styles.itemNumber}>{item.number}</Text>
            </View>

            <Text style={styles.itemRepairs}>
              {item.repairs.length} ремонтов
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title="Добавить опору"
        onPress={() =>
          navigation.navigate('AddEditPole', {addPole: handleAddPole})
        }
      />
    </View>
  );
};

export default MainScreen;
