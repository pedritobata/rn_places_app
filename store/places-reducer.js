import { ADD_PLACE } from './places-actions';
import Place from '../model/place';

const initialState = {
    places: []
}

export const placesReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_PLACE:
            const newPlace = new Place(new Date().toString(), 
            action.placeData.title, action.placeData.image);
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state;
    }
}