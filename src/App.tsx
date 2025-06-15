import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigation } from './navigation';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppNavigation />
    </>
  );
} 