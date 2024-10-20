import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Screen_01 from './Screens/Screen_01.js';
import Screen_02 from './Screens/Screen_02.js';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Screen_02' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Screen_01' component={Screen_01} />
        <Stack.Screen name='Screen_02' component={Screen_02} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}