import React, {Dispatch, SetStateAction, useState, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  StyleSheet,
  Switch,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {IRepair} from '../types/storeTypes';
import {basisBtn, basisStyle} from '../styles/basisStyle';
import {predefinedSuggestionsRepair} from '../data/dataSuqqestions';

interface IProps {
  modalVisibleAddRepair: boolean; // Видимость модального окна
  setModalVisibleAddRepair: Dispatch<SetStateAction<boolean>>; // Функция для изменения видимости модального окна
  handleAddRepair(description: string, isUrgent: boolean): void; // Функция для добавления нового ремонта
  repair?: IRepair; // Объект ремонта для редактирования (если есть)
  updateUrgent?(item: IRepair, isUrgent: boolean): void; // Функция для обновления срочности ремонта
  updateRepair?(description: string, item: IRepair): void; // Функция для обновления ремонта
  handleDelete?(id: string): void; // Функция для удаления ремонта
}

const ModalAddRepairs: React.FC<IProps> = ({
  modalVisibleAddRepair,
  setModalVisibleAddRepair,
  handleAddRepair,
  repair,
  updateRepair,
  updateUrgent,
  handleDelete,
}) => {
  const [description, setDescription] = useState<string>(
    repair ? repair.description : '',
  ); // Хранит текст описания ремонта
  const [isUrgent, setIsUrgent] = useState<boolean>(
    repair ? repair.urgent : false,
  ); // Хранит состояние срочности
  const [suggestions, setSuggestions] = useState<string[]>([]); // Хранит текущие подсказки
  const fadeAnim = useRef(new Animated.Value(0)).current; // Анимация прозрачности

  // Сброс состояния ввода
  const resetInputState = () => {
    setDescription('');
    setIsUrgent(false);
  };

  // Обработчик изменения текста в поле ввода
  const handleInputChange = (text: string) => {
    setDescription(text);

    // Если есть текст, ищем подсказки
    if (text) {
      const lastWord = text.split(' ').pop() || ''; // Получаем последнее слово
      const filteredSuggestions = predefinedSuggestionsRepair.filter(item =>
        item.toLowerCase().startsWith(lastWord.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
      filteredSuggestions.length > 0 ? fadeIn() : fadeOut();
    } else {
      setSuggestions([]);
      fadeOut();
    }
  };

  // Обработчик нажатия на подсказку
  const handleSuggestionPress = (suggestion: string) => {
    const words = description.split(' ').slice(0, -1); // Удаляем последнее слово
    const newText = words.join(' '); // Объединяем слова
    setDescription(
      newText.length > 0 ? `${newText} ${suggestion}` : suggestion,
    ); // Добавляем подсказку
    setSuggestions([]); // Очищаем подсказки
    fadeOut();
  };

  // Обновление существующего ремонта
  const updateExistingRepair = () => {
    if (repair) {
      updateRepair && updateRepair(description, repair);
      updateUrgent && updateUrgent(repair, isUrgent);
      resetInputState();
      setModalVisibleAddRepair(false);
    }
  };

  // Добавление нового ремонта
  const addNewRepair = () => {
    handleAddRepair(description, isUrgent);
    resetInputState();
    setModalVisibleAddRepair(false);
  };

  // Удаление ремонта
  const deleteRepair = () => {
    if (repair) {
      handleDelete && handleDelete(repair.id);
      resetInputState();
      setModalVisibleAddRepair(false);
    }
  };

  // Функция для анимации появления
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Функция для анимации исчезновения
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const value = {
    setDescription,
    predefinedSuggestionsRepair,
    setSuggestions,
    fadeOut,
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibleAddRepair}
      onRequestClose={() => setModalVisibleAddRepair(!modalVisibleAddRepair)}>
      <BlurView
        style={styles.absolute}
        blurType="light" // Тип размытия (light, dark и т.д.)
        blurAmount={10} // Степень размытия
        reducedTransparencyFallbackColor="white" // Цвет для устройств без поддержки
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={basisStyle.textInputModal}
            placeholderTextColor={'#BDBDBD'}
            value={repair ? repair.description : description} // Используем существующее описание, если доступно
            onChangeText={handleInputChange} // Устанавливаем обработчик текста
            placeholder="Введите тип ремонта"
          />
          {/* Отображаем подсказки, если они есть */}
          {suggestions.length > 0 && (
            <View style={styles.suggestionList}>
              <Animated.View
                style={[ {opacity: fadeAnim}]}>
                <FlatList
                  data={suggestions}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleSuggestionPress(item)}>
                      <Text style={styles.suggestion}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyboardShouldPersistTaps="handled" // Убираем скрытие клавиатуры при нажатии на подсказку
                />
              </Animated.View>
            </View>
          )}
          <View style={styles.switchContainer}>
            <Switch
              value={isUrgent}
              onValueChange={() => setIsUrgent(!isUrgent)}
            />
            <Text
              style={[
                styles.switchTxt,
                isUrgent ? styles.redSwitchTxt : styles.defaultSwitchTxt,
              ]}>
              Приоритет
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[basisBtn.btn, basisBtn.btnAdd]}
              onPress={repair ? updateExistingRepair : addNewRepair}>
              <Text style={basisBtn.btnText}>Сохранить</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[basisBtn.btn, basisBtn.btnDelete]}
              onPress={
                repair ? deleteRepair : () => setModalVisibleAddRepair(false)
              }>
              <Text style={basisBtn.btnText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 14,
    // iOS
    shadowColor: 'rgba(38, 36, 131, 0.25)', // Цвет тени
    shadowOffset: {
      width: 0, // Смещение по оси X
      height: 2, // Смещение по оси Y
    },
    shadowOpacity: 1, // Прозрачность
    shadowRadius: 20, // Радиус размытия
    // Android
    elevation: 5, // Задаем elevation, чтобы тень отображалась на Android
  },
  suggestionList: {
    position: 'absolute', // Используем абсолютное позиционирование
    top: 70, // Позиция относительно TextInput
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150,
    zIndex: 1,
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  btnContainer: {
    marginTop: 15,
    gap: 5,
  },
  switchContainer: {
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  switchTxt: {
    fontSize: 14,
  },
  redSwitchTxt: {
    color: 'red',
  },
  defaultSwitchTxt: {
    color: '#757575', // Или любой другой цвет по умолчанию
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ModalAddRepairs;
