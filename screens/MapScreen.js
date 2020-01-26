import React, { useState, useEffect, useCallback } from 'react';
import {  StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const MapScreen = props => {

    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: -12.0903335,
        longitude: -77.0439195,
        //los deltas serían como decir "Kilometros a la redonda a mostrar"
        latitudeDelta: 0.092,
        longitudeDelta: 0.041 
    }

    const selectLocationHandler = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        });
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation){
            return;
        }
        props.navigation.navigate('NewPlace', {pickedLocation: selectedLocation});
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation: savePickedLocationHandler});
    },[savePickedLocationHandler]);

    let markerCoordinates;

    if(selectedLocation){
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }


    //Se le tiene que especificar las dimensiones del map obligatorio para que se muestre
    //generamos un style
    return <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
        {markerCoordinates && <Marker title="Picked Location"  coordinate={markerCoordinates} />}
    </MapView>
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam("saveLocation");

    return {
        headerTitle: "",
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
           
    }
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === "android" ? 'white' : Colors.primary
    }
});

export default MapScreen;