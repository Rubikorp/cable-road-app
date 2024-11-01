import {View, Text, TextInput, Image} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from '../styles/AddEditPole_style';
import {IRepair} from '../types/storeTypes';

interface IProps {
  photoUri: {text: string; uri: string};
  setRepairs: Dispatch<SetStateAction<IRepair[]>>;
  repairs: IRepair[];
  item: IRepair;
}

export const PhotoAndDsc: React.FC<IProps> = ({
  photoUri,
  setRepairs,
  repairs,
  item,
}) => {
  /** Функция реализации подписи не работает найти решение в будущем 
    // const [text, setText] = useState<string>(photoUri.text ? photoUri.text : '')
    // const [uri, setUri] = useState<string>(photoUri.uri ? photoUri.uri : '')

    // const updatePhotos = (input: string) => {
    //     const updatedPhotos = item.photos.map(photo =>
    //         photo.uri === photoUri.uri
    //           ? {text: text, uri: photoUri.uri}
    //           : {text: text, uri: photoUri.uri},
    //       );
    //     setText(text)
    //     setRepairs(repairs.map(repair => repair.id === item.id ? {...repair, updatedPhotos} : {...repair}) )
    // }
**/
  return (
    <View>
      <Image source={{uri: photoUri.uri}} style={{width: 200, height: 200}} />
      {/* <TextInput
        placeholder="Подпись"
        onChangeText={text => updatePhotos(text)}
        style={styles.input}
      /> */}
    </View>
  );
};
