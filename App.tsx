// App.tsx
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/store/store';
import MainScreen from './src/screens/MainScreen';
import AddEditPoleScreen from './src/screens/AddEditPoleScreen';

import {navigationStyle} from './src/styles/basisStyle';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
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
