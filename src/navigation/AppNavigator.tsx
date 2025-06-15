import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from './MainTabNavigator';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderConfirmationScreen } from '../screens/OrderConfirmationScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Main" component={MainTabNavigator} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
  </Stack.Navigator>
); 