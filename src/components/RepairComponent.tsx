import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

import {IRepair} from '../types/storeTypes';
import {basisStyle} from '../styles/basisStyle';

interface IProps {
  repair: IRepair;
  setModalVisibleUpdateRepair: Dispatch<SetStateAction<boolean>>;
  updateComplete(repair: IRepair): void;
  openConfModal(text: 'repair', id: string): void;
}

const RepairComponent: React.FC<IProps> = React.memo(({
  repair,
  setModalVisibleUpdateRepair,
  updateComplete,
  openConfModal,
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
          <View style={styles.urgDateContainer}>
            {repair.urgent && (
              <Text style={basisStyle.dscPriority}>приоритет</Text>
            )}
            {repair.dateComplete ? (
              <Text style={styles.dateComplete}>{repair.dateComplete}</Text>
            ) : (
              <Text style={styles.date}>{repair.date}</Text>
            )}
          </View>
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
              source={require('../img/complete.png')}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btn, styles.btnDelete]}
          onPress={() => openConfModal('repair', repair.id)}>
          <Image
            style={styles.imgBtnDelete}
            source={require('../img/delete.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

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
  urgDateContainer: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15
  },
  date: {
    padding: 2,
    borderRadius: 2,
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#C00F0C'
  },
  dateComplete: {
    padding: 2,
    borderRadius: 2,
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#009951'
  }
});
