import {Dimensions, Image, StyleSheet, View} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {serverIp, usingServer} from "../localProperties";

export default function MapScreen({navigation}) {

    const [pins, setPins] = useState([]);
    const [region, setRegion] = useState({latitude: 0, longitude: 0, latitudeDelta: 20, longitudeDelta: 20});

    useEffect(async () => {
        if (usingServer) {
            await fetch(
                'http://'.concat(serverIp).concat(':8080/user/contacts'), {
                    method: 'get',
                    mode: 'no-cors'
                }
            )
                .then(res => res.json())
                .then(data => {
                    setPins(data);
                    if (data[0]) {
                        setRegion({
                            latitude: data[0].coordinates.latitude,
                            longitude: data[0].coordinates.longitude,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2
                        })
                    }
                })
                .catch(console.error)
        } else {
            setPins([
                {
                    id: 1,
                    coordinates: {latitude: -34.6077514, longitude: -58.3852248},
                    username: 'cdondovich'
                },
                {
                    id: 2,
                    coordinates: {latitude: -34.611257, longitude: -58.3801285},
                    username: 'amelian'
                }
            ]);
            setRegion({
                latitude: -34.6077514,
                longitude: -58.3852248,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            })
        }
    }, []);

    const mapMarkers = () => {
        return pins.map((marker) => <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinates}
            title={marker.username}
        >
            <Image source={require('../assets/pin3.png')} style={{height: 32, width: 32}}/>
        </MapView.Marker>)
    }

    return (
        <View style={styles.container}>
            <MapView
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                loadingEnabled={true}
                mapType="standard"
                initialRegion={{latitude: 0, longitude: 0, latitudeDelta: 20, longitudeDelta: 20}}
                region={region}
            >
                {mapMarkers()}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 35
    }
});

const mapStyle = [
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e9e9e9',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dedede',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36,
            },
            {
                color: '#333333',
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2',
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
];