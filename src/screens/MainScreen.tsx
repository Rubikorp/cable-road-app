import React, { useState } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { addPole } from '../store/polesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const MainScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const poles = useAppSelector(state => state.poles.poles);
  
  // Состояние для поискового запроса
  const [searchQuery, setSearchQuery] = useState('');

  // Функция для фильтрации опор и ремонтов
  const filteredPoles = poles.filter(pole => 
    pole.number.includes(searchQuery) || 
    pole.repairs.some(repair => repair.description.includes(searchQuery))
  );

  const handleAddPole = (newPole: { id: string; number: string; repairs: any[]; photos: any[] }) => {
    dispatch(addPole(newPole));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Поиск по номеру опоры или ремонту"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <Button title="Добавить опору" onPress={() => navigation.navigate('AddEditPole', { addPole: handleAddPole })} />
      <FlatList
        data={filteredPoles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AddEditPole', { pole: item })} style={styles.itemContainer}>
            <Text style={styles.itemNumber}>{item.number}</Text>
            <Text style={styles.itemRepairs}>{item.repairs.length} ремонтов</Text>
          </TouchableOpacity>
          
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
  },
  itemNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemRepairs: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default MainScreen;