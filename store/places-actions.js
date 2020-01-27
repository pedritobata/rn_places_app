export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';


export const addPlace = (title, image, location) => {
    return async dispatch => {
        //invocamos a la api de geolocation para obtener la direccion o address seleccionada
        //a partir de las coordenadas
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`);
        if(!response.ok){
            throw new Error('API error');
        }

        const resData = await response.json();
        //console.log('resData::',resData);
        if(!resData.results){
            throw new Error('Could not get the address selected from api');
        }
        //el objeto que devuelve la api de google es MUY grande
        //pero hay una propieda que trae la address
        const address = resData.results[0].formatted_address;


        //queremos guardar la imagen en el dispositivo en un area de memoria segura y persistente
        //el ultimo elemento del path es el nombre del archivo imagen
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try{
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, 
                newPath,
                 address, 
                 location.lat, 
                 location.lng
                 );
            console.log(dbResult);
            dispatch( {type: ADD_PLACE, 
                placeData: {
                    id: dbResult.insertId ,
                    title: title, 
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }});
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