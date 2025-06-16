import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { useLanguage } from '../contexts/LanguageContext';

export const ProfileScreen: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.myAccount}</Text>
      <Text style={styles.text}>{t.profileDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.secondary,
    marginBottom: 12,
  },
  text: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
}); 