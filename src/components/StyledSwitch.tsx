import React, {useState, Dispatch, SetStateAction} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';

interface IProps {
  setCompleted:Dispatch<SetStateAction<boolean>>
}

const StyledSwitch: React.FC<IProps> = ({setCompleted}) => {
  // Состояние для отслеживания положения переключателя
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Создаем анимационное значение
  const [indicatorPosition] = useState(new Animated.Value(0)); // Начальная позиция
  const [indicatorColor] = useState(new Animated.Value(0));

  // Обработчик нажатия
  const toggleSwitch = () => {
    setIsCompleted(!isCompleted);
    setCompleted(!isCompleted);

    // Анимация перемещения индикатора
    Animated.parallel([
      Animated.timing(indicatorPosition, {
        toValue: isCompleted ? 0 : 180,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(indicatorColor, {
        toValue: isCompleted ? 0 : 1, // Изменяем значение для перехода цвета
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
  };

  const backgroundColorInterpolation = indicatorColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(179, 38, 30, 0.16)', 'rgba(0, 153, 81, 0.28)'], // Цвета для невыполненного и выполненного состояния
});

  return (
    <TouchableOpacity
      style={
        styles.switch}
      onPress={toggleSwitch}>
      <View style={styles.containerTxt}>
        <Text
          style={[
            styles.switchText,
            isCompleted ? styles.defaultTxt : styles.txtUnComplete,
          ]}>
          Невыполнено
        </Text>
        <Text
          style={[
            styles.switchText,
            isCompleted ? styles.txtComplete : styles.defaultTxt,
          ]}>
          Выполнено
        </Text>
      </View>

      <Animated.View
        style={[styles.indicator, { left: indicatorPosition, backgroundColor: backgroundColorInterpolation }]}></Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerTxt: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  switch: {
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    position: 'relative',
  },
  completed: {
    backgroundColor: 'rgba(0, 153, 81, 0.28)',
  },
  notCompleted: {
    backgroundColor: 'rgba(179, 38, 30, 0.16)',
  },
  indicator: {
    position: 'absolute',
    width: "50%",
    height: "250%",
    borderRadius: 100,// Отступ от верхнего края
  },
  switchText: {
    flex: 1,
    textAlign: 'center',
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
