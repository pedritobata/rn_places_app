import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import * as placeActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import LocatorPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {

    const [selectedImage, setSelectedImage] = useState();

    const dispatch = useDispatch();

    const [titleValue, setTitleValue] = useState('');

    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    const savePlaceHandler = () => {
        dispatch(placeActions.addPlace(titleValue, selectedImage));
        props.navigation.goBack();
    }

    return <ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={titleChangeHandler}
                value={titleValue}
            />
            <ImagePicker onImageTaken={imageTakenHandler} />
            <LocationPicker navigation={props.navigation}  />
            <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler}/>
        </View>
    </ScrollView>
}

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'New Place'
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;