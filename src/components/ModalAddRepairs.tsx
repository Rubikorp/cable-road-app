import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  StyleSheet
} from 'react-native';
import { IRepair } from '../types/storeTypes';

interface IProps {
  modalVisibleAddRepair: boolean;
  setModalVisibleAddRepair: Dispatch<SetStateAction<boolean>>;
  handleAddRepair(dsc: string, urg: boolean): void;
  repair?: IRepair;
}

const ModalAddRepairs: React.FC<IProps> = ({
  modalVisibleAddRepair,
  setModalVisibleAddRepair,
  handleAddRepair,
  repair,
}) => {
  const [dsc, setDsc] = useState<string>(''); // Хранит текст ввода
  const [suggestions, setSuggestions] = useState<string[]>([]); // Хранит текущие подсказки
  const fadeAnim = useRef(new Animated.Value(0)).current; // Анимация прозрачности

  // Предустановленные данные для подсказок
  const data: string[] = [
    'БК6', 'БК10', 'Лестница', 'Стрела', 'Струнка',
    'Струнки', 'Стрелы', 'порожняя', 'груженная', 
    'Каретка', 'подшибники', 'подшибник', 'зазор', 
    'передний', 'Cтрела порож болты бок замена (М20/60)',
    'Cтрела груж болты бок замена (М20/60)', 
    'Cтрелы болты бок замена (М20/60)', 
    'Cтрелы болты все замена'
  ];

  // Обработчик изменения текста в поле ввода
  const handleInputChange = (text: string) => {
    setDsc(text);

    // Если есть текст, ищем подсказки
    if (text) {
      const lastWord = text.split(' ').pop() || ''; // Получаем последнее слово
      const filteredSuggestions = data.filter(item => 
        item.toLowerCase().startsWith(lastWord.toLowerCase())
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
    const words = dsc.split(' ').slice(0, -1); // Удаляем последнее слово
    const newText = words.join(' '); // Объединяем слова
    setDsc(newText.length > 0 ? `${newText} ${suggestion}` : suggestion); // Добавляем подсказку
    setSuggestions([]); // Очищаем подсказки
    fadeOut();
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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibleAddRepair}
      onRequestClose={() => setModalVisibleAddRepair(!modalVisibleAddRepair)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.textInput}
            value={repair ? repair.description : dsc} // Используем существующее описание, если доступно
            onChangeText={handleInputChange} // Устанавливаем обработчик текста
            placeholder="Введите тип ремонта"
          />
          {/* Отображаем подсказки, если они есть */}
          {suggestions.length > 0 && (
            <Animated.View style={[styles.suggestionList, { opacity: fadeAnim }]}>
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                    <Text style={styles.suggestion}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled" // Убираем скрытие клавиатуры при нажатии на подсказку
              />
            </Animated.View>
          )}
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
    backgroundColor: '#a7a2a247',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  suggestionList: {
    position: 'absolute', // Используем абсолютное позиционирование
    top: 77, // Позиция относительно TextInput
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
  button: {},
  buttonClose: {},
});

export default ModalAddRepairs;
