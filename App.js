import React from 'react';
import { View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {placesReducer} from './store/places-reducer';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { init } from './helpers/db';

//inicializamos la bd
init().then(() => {
  console.log('Initialiazing BD successful.');
})
.catch(err => {
  console.log('Initialiazing BD failed.');
  console.log(err);
})



const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {
  //Para que el navigator NO muestre las pantallas en blanco, NO se debe
  //envolver dicho navigator en View!!
  return (
      <Provider store={store}>
        <PlacesNavigator />
      </Provider>
  );
}
