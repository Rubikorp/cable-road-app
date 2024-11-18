// src/screens/AuthScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {getDecryptedCredentials} from '../data/auth'; // Импортируйте зашифрованные данные
import {PropsNavigation} from '../types/stackTypes';
import EncryptedStorage from 'react-native-encrypted-storage';
import {basisStyle, basisBtn} from '../styles/basisStyle';

const AuthScreen: React.FC<PropsNavigation> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    let decrypted = getDecryptedCredentials();
    if (username === decrypted.login && password === decrypted.password) {
      await EncryptedStorage.setItem('username', username);
      await EncryptedStorage.setItem('password', password);
      navigation.navigate('Main');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={[basisStyle.textInp]}
          placeholder="Логин"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={[basisStyle.textInp]}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={[basisBtn.btn, basisBtn.btnSave]}
        onPress={handleLogin}>
        <Text style={basisBtn.btnText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  containerInput: {
    gap: 16,
    marginBottom: 30
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10
  },
});

export default AuthScreen;
