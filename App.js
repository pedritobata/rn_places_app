import React from 'react';
import { View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';

export default function App() {
  //Para que el navigator NO muestre las pantallas en blanco, NO se debe
  //envolver dicho navigator en View!!
  return (
      <PlacesNavigator />
  );
}
