import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

import {IRepair} from '../types/storeTypes';
import {basisStyle} from '../styles/basisStyle';

interface IProps {
  repair: IRepair;
  setModalVisibleUpdateRepair: Dispatch<SetStateAction<boolean>>;
  updateComplete(repair: IRepair): void;
}

const RepairComponent: React.FC<IProps> = ({
  repair,
  setModalVisibleUpdateRepair,
  updateComplete,
}) => {
  return (
    <View
      style={[
        styles.container,
        repair.completed ? styles.completeBorder : styles.uncompleteBorder,
      ]}>
      <View style={styles.txtContainer}>
        <TouchableOpacity onPress={() => setModalVisibleUpdateRepair(true)}>
          <Text style={[basisStyle.dsc, styles.dscMax]}>
            {repair.description}
          </Text>
          {repair.urgent && (
            <Text style={basisStyle.dscPriority}>приоритет</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        {repair.completed ? (
          <TouchableOpacity
            style={[styles.btn, styles.btnUnComplete]}
            onPress={() => updateComplete(repair)}>
            <Image
              style={styles.imgBtnUnComplete}
              source={require('../img/unComplete.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, styles.btnComplete]}
            onPress={() => updateComplete(repair)}>
            <Image
              style={styles.imgBtnComplete}
              source={require('../img/complete.svg')}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.btn, styles.btnDelete]}>
          <Image
            style={styles.imgBtnDelete}
            source={require('../img/delete.svg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RepairComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderLeftWidth: 5,
  },
  txtContainer: {
    marginLeft: 18,
  },
  btnContainer: {
    gap: 16,
    flexDirection: 'row',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  btnComplete: {
    backgroundColor: '#14ae5c',
  },
  btnUnComplete: {
    backgroundColor: '#545253',
  },
  btnDelete: {
    backgroundColor: '#c00f0c',
  },
  completeBorder: {
    borderLeftColor: '#009951',
  },
  uncompleteBorder: {
    borderLeftColor: '#852221',
  },
  dscMax: {
    maxWidth: 172,
  },
  imgBtnComplete: {
    width: 30,
    height: 21,
  },
  imgBtnUnComplete: {
    width: 22,
    height: 5,
  },
  imgBtnDelete: {
    width: 22,
    height: 22,
  },
});
