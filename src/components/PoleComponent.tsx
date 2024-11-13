import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import { basisStyle } from '../styles/basisStyle';

import {IPole} from '../types/storeTypes';

interface IProps {
  pole: IPole;
  navigation: any;
}

const PoleComponent: React.FC<IProps> = ({pole, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('AddEditPole', {pole})} style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={require('../img/pole.png')} />
      </View>
      <View style={styles.dscContainer}>
        <Text style={styles.poleNumber}>{pole.number}</Text>
        <Text style={basisStyle.dsc}>
          Кол-во не выполненных ремонтов:{' '}
          {pole.repairs.filter(item => item.completed === false).length}
        </Text>
        <Text style={basisStyle.dsc}>
          Кол-во выполненных ремонтов:{' '}
          {pole.repairs.filter(item => item.completed === true).length}
        </Text>
        {pole.repairs.find(repair => repair.urgent === true) && (
          <Text style={[basisStyle.dscPriority, styles.priority]}> приоритет </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PoleComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: "#f6f6f6"
  },
  dscContainer: {
    flex: 5,
    position: "relative",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',

  },
  img: {
    height:46,
    width: 25,
  },
  poleNumber: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginBottom: 8
  },
  priority: {
    position: 'absolute',
    top: 2,
    right: 0
  }
});
