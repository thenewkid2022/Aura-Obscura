import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { HomeScreen } from '../screens/HomeScreen';
import { ShopScreen } from '../screens/ShopScreen';
import { CartScreen } from '../screens/CartScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ContactScreen } from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.backgroundPrimary,
        borderTopColor: Colors.border,
        height: 70,
        paddingBottom: 10,
        paddingTop: 6,
      },
      tabBarActiveTintColor: Colors.secondary,
      tabBarInactiveTintColor: Colors.textMuted,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      tabBarIcon: ({ color, size, focused }) => {
        let iconName = '';
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Shop':
            iconName = focused ? 'grid' : 'grid-outline';
            break;
          case 'Warenkorb':
            iconName = focused ? 'cart' : 'cart-outline';
            break;
          case 'Favoriten':
            iconName = focused ? 'heart' : 'heart-outline';
            break;
          case 'Konto':
            iconName = focused ? 'person' : 'person-outline';
            break;
          case 'Kontakt':
            iconName = focused ? 'mail' : 'mail-outline';
            break;
        }
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Shop" component={ShopScreen} />
    <Tab.Screen name="Warenkorb" component={CartScreen} />
    <Tab.Screen name="Favoriten" component={FavoritesScreen} />
    <Tab.Screen name="Konto" component={ProfileScreen} />
    <Tab.Screen name="Kontakt" component={ContactScreen} />
  </Tab.Navigator>
); 