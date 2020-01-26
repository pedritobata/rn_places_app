import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../model/place';

const initialState = {
    places: []
}

export const placesReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_PLACES:
            return {
                //notese que al crear el objeto Place no es necesario mandar todos los argumentos del
                //constructor, es decir que el cosntructor se comporta igual que cualquier otra 
                //funcion de JS
                places: action.places.map(place => new Place(place.id.toString(), place.title, place.imageUri))
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(), 
                action.placeData.title, 
                action.placeData.image);
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}