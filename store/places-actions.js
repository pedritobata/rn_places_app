export const ADD_PLACE = 'ADD_PLACE';
import * as FileSystem from 'expo-file-system';


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
        }catch(err){
            console.log(err);
            throw err;
        }

        dispatch( {type: ADD_PLACE, placeData: {title: title, image: newPath}});
    }
}