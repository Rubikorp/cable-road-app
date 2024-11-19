import React, {
  Dispatch,
  SetStateAction,
} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface IProps {
  setIsCompleted: Dispatch<SetStateAction<boolean>>;
  isCompleted: boolean;
}

const StyledSwitch: React.FC<IProps> = ({setIsCompleted, isCompleted}) => {
  return (
    <View style={styles.switch}>
      <TouchableOpacity style={[styles.containerTxt, isCompleted ? '' : styles.unCompleteColor]} onPress={()=>setIsCompleted(false)}>
        <Text
          style={[
            styles.switchText,
            isCompleted ? styles.defaultTxt : styles.txtUnComplete,
          ]}>
          Ремонт
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.containerTxt, isCompleted ? styles.completeColor : '']} onPress={()=>setIsCompleted(true)}>
        <Text
          style={[
            styles.switchText,
            isCompleted ? styles.txtComplete : styles.defaultTxt,
          ]}>
          Выполнено
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    borderRadius: 100,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  containerTxt: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  unCompleteColor: {
    backgroundColor: ' rgba(179, 38, 30, 0.16)'
  },
  completeColor: {
    backgroundColor: ' rgba(0, 153, 81, 0.28)'
  },
  switchText: {
    fontSize: 16,
  },
  txtComplete: {
    color: '#5DB075',
  },
  txtUnComplete: {
    color: '#b05d5d',
  },
  defaultTxt: {
    color: '#BDBDBD',
  },
});

export default StyledSwitch;
