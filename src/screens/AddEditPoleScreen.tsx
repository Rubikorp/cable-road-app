import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  Text,
  Switch,
  PermissionsAndroid
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch} from '../store/hooks';
import {updatePole, deletePole} from '../store/polesSlice';
import {PropsNavigation} from '../types/stackTypes';
import styles from '../styles/AddEditPole_style';
import {IPole, IRepair} from '../types/storeTypes'
import { PhotoAndDsc } from '../components/PhotoAndDsc';

const AddEditPoleScreen: React.FC<
  {
    route: any;
  } & PropsNavigation
> = ({route, navigation}) => {

  const dispatch = useAppDispatch();

  const {pole, addPole} = route.params || {};
  const [number, setNumber] = useState<string>(pole ? pole.number : '');
  const [repairs, setRepairs] = useState<IRepair[]>(pole ? pole.repairs : []);


  useEffect(() => {
    requestStoragePermission();
  }, []);

  // функция получения доступа к галерее
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
          title: 'Доступ к галерее',
          message:
            'Мне нужен доступ к вашей галерее' +
            'Для добавления фотографий',
          buttonNeutral: 'Позже',
          buttonNegative: 'Отмена',
          buttonPositive: 'Ок',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // функция создания ремонта
  const handleAddRepair = () => {
    const newRepair: IRepair = {
      id: Date.now().toString(),
      description: '',
      photos: [],
      urgent: false, // Изначально пометка срочности выключена
    };
    setRepairs(prev => [...prev, newRepair]);
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

    // функция выбора фотографии
    const selectImage = (repairId: string) => {
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (response.didCancel) {
          // user отменил
        } else if (response.errorMessage) {
          console.log(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const uri = asset.uri;
  
          // Проверяем, что uri существует
          if (uri) {
            const updatedRepairs = repairs.map(repair =>
              repair.id === repairId
                ? {...repair, photos: [...repair.photos, {uri: uri, text: ''}]} // Добавляем только uri
                : repair,
            );
            setRepairs(updatedRepairs);
            console.log(updatedRepairs);
          }
        }
      });
    };

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
        renderItem={({item}) => (
          <View style={styles.repairContainer}>
            <TextInput
              placeholder="Описание ремонта"
              value={item.description}
              onChangeText={text => {
                const updatedRepairs = repairs.map(repair =>
                  repair.id === item.id
                    ? {...repair, description: text}
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
                      ? {...repair, urgent: !repair.urgent}
                      : repair,
                  );
                  setRepairs(updatedRepairs);
                }}
              />
            </View>
            {item.urgent && <Text style={styles.urgentSign}>⚠️</Text>}
            <Button
              title="Добавить фото"
              onPress={() => {
                selectImage(item.id)
              }}
            />
            <FlatList
              data={item.photos}
              keyExtractor={photo => photo.uri}
              renderItem={({item: photoUri}) => (
                <PhotoAndDsc
                item={item} 
                photoUri={photoUri}
                setRepairs={setRepairs}
                repairs={repairs}
                />
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

export default AddEditPoleScreen;
