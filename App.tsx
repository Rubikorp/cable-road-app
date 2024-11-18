// App.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/store/store';
import MainScreen from './src/screens/MainScreen';
import AddEditPoleScreen from './src/screens/AddEditPoleScreen';
import AuthScreen from './src/screens/AuthScreen';

import {navigationStyle} from './src/styles/basisStyle';
import EncryptedStorage from 'react-native-encrypted-storage';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const username = await EncryptedStorage.getItem('username');
      const password = await EncryptedStorage.getItem('password');
      if (username && password) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // Можно добавить загрузочный экран
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Main' : 'Auth'}>
          {!isLoggedIn && (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{header: () => (
                <View style={navigationStyle.container}>
                  <Text style={navigationStyle.header}>Авторизация</Text>
                </View>
              ),}}
            />
          )}
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{
              header: () => (
                <View style={navigationStyle.container}>
                  <Text style={navigationStyle.header}>Главная</Text>
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="AddEditPole"
            component={AddEditPoleScreen}
            options={({navigation}) => ({
              header: () => (
                <View style={navigationStyle.container}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={navigationStyle.goBackContainer}>
                    <Text style={navigationStyle.goBack}>Назад</Text>
                  </TouchableOpacity>
                  <Text style={navigationStyle.header}>Редактор</Text>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
