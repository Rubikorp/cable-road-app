import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Image, Text, Switch, StyleSheet } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { updatePole, deletePole } from '../store/polesSlice';
import { PropsNavigation } from '../types/stackTypes';
import { launchImageLibrary } from 'react-native-image-picker';

interface Repair {
  id: string;
  description: string;
  photos: string[];
  urgent: boolean; // Поле для пометки срочности
}

interface Pole {
  id: string;
  number: string;
  repairs: Repair[];
  photos: string[];
}

const AddEditPoleScreen: React.FC<{
  route: any,
} & PropsNavigation> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { pole, addPole } = route.params || {};
  const [number, setNumber] = useState<string>(pole ? pole.number : '');
  const [repairs, setRepairs] = useState<Repair[]>(pole ? pole.repairs : []);
  const [photos, setPhotos] = useState<string[]>(pole ? pole.photos : []);

  const handleAddRepair = () => {
    const newRepair: Repair = {
      id: Date.now().toString(),
      description: '',
      photos: [],
      urgent: false, // Изначально пометка срочности выключена
    };
    setRepairs(prev => [...prev, newRepair]);
  };

  const handleSave = () => {
    const newPole: Pole = {
      id: pole ? pole.id : Date.now().toString(),
      number,
      repairs,
      photos,
    };
    if (pole) {
      dispatch(updatePole(newPole));
    } else {
      addPole(newPole);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deletePole(id));
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Номер опоры"
        value={number}
        onChangeText={setNumber}
        style={styles.input}
      />
      <Button title="Добавить ремонт" onPress={handleAddRepair} />
      <FlatList
        data={repairs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.repairContainer}>
            <TextInput
              placeholder="Описание ремонта"
              value={item.description}
              onChangeText={text => {
                const updatedRepairs = repairs.map(repair =>
                  repair.id === item.id
                    ? { ...repair, description: text }
                    : repair,
                );
                setRepairs(updatedRepairs);
              }}
              style={styles.input}
            />
            <View style={styles.switchContainer}>
              <Text>Срочно</Text>
              <Switch
                value={item.urgent}
                onValueChange={() => {
                  const updatedRepairs = repairs.map(repair =>
                    repair.id === item.id
                      ? { ...repair, urgent: !repair.urgent }
                      : repair,
                  );
                  setRepairs(updatedRepairs);
                }}
              />
            </View>
            {item.urgent && <Text style={styles.urgentSign}>⚠️</Text>}
            <Button title="Добавить фото" onPress={() => { /* Ваш код для добавления фото */ }} />
            <FlatList
              data={item.photos}
              keyExtractor={photo => photo}
              renderItem={({ item: photoUri }) => (
                <View>
                  <Image
                    source={{ uri: photoUri }}
                    style={{ width: 100, height: 100 }}
                  />
                  <TextInput
                    placeholder="Подпись"
                    onChangeText={text => {
                      const updatedPhotos = item.photos.map(uri =>
                        uri === photoUri ? text : uri,
                      );
                      setRepairs(prev =>
                        prev.map(repair =>
                          repair.id === item.id
                            ? { ...repair, photos: updatedPhotos }
                            : repair,
                        ),
                      );
                    }}
                    style={styles.input}
                  />
                </View>
              )}
            />
          </View>
        )}
      />
      <Button
        title="Сохранить"
        onPress={() => {
          handleSave();
          navigation.navigate('Main');
        }}
      />
      {pole && (
        <Button
          title="Удалить"
          onPress={() => {
            handleDelete(pole.id);
            navigation.navigate('Main');
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  repairContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  urgentSign: {
    fontSize: 18,
    color: 'red',
  },
});

export default AddEditPoleScreen;
