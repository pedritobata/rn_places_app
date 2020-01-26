export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';


export const addPlace = (title, image) => {
    return async dispatch => {
        //queremos guardar la imagen en el dispositivo en un area de memoria segura y persistente
        //el ultimo elemento del path es el nombre del archivo imagen
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try{
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 13.2);
            console.log(dbResult);
            dispatch( {type: ADD_PLACE, placeData: {id: dbResult.insertId ,title: title, image: newPath}});
        }catch(err){
            console.log(err);
            throw err;
        }

    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchPlaces();
            dispatch({type: SET_PLACES, places: dbResult.rows._array});
        }catch(err){
            throw err;
        }
    }
};