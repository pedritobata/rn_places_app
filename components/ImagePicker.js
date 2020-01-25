import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image , Alert} from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState();

    //con esta funcion que creamos pedimos permiso al user para usar la camara
    //lo bueno es que el dispositivo va a recordar la decision la primera vez y 
    //si e user dió permiso , el dispositivo ya no mostrará el mensaje al user sino
    //que defrente nos va a devolver el status como granted
    const verifyPermissions = async () => {
        //necesitamos los dos permisos camera y camera roll sino no funca!!
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== 'granted'){
            Alert.alert("Insufficient permissions!", "You need to grant camera permissions to use this app.",
            [{text: 'Ok'}]);
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }

        //con esto ya se abre la camara!!
        //en el argumento del launch le mando opcionalmente una conf de la camara
        //la camara me devuelve un objeto imagen en una promesa. de esa imagen me interesa su uri
        const image =  await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5, // 1 es la calidad maxima
        });
        //la uri puede ser utilizada directamente por el componente Image
        setPickedImage(image.uri);
    }

    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!pickedImage ? <Text>No image picked yet.</Text>
             :<Image style={styles.image} source={{uri: pickedImage}} />}
        </View>
        <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
    </View>
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: "center"
    }, 
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImgPicker;