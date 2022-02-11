import {Dimensions, StyleSheet, View, Image} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import * as React from "react";

export function MapScreen({ navigation }) {
    return (
        <View style={styles.container}>


            <MapView
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                loadingEnabled={true}
                region={{
                    latitude: -15.59611,
                    longitude: -56.09667,
                    latitudeDelta: 70,
                    longitudeDelta: 1
                }}
                mapType="standard"
            >
                {response.map(marker => (
                    <MapView.Marker
                        key={marker.id}
                        coordinate={marker.coordinates}
                        title={marker.title}
                        description={marker.description}
                    >
                        <Image source={ marker.icon } style={{ height: 32, width: 32 }} />
                    </MapView.Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

const height = Dimensions.get('window').height;

const response = [
    {
        id: '1',
        coordinates: {
            latitude: -15.59611,
            longitude: -56.09667,
        },
        title: 'Cuiabá',
        description: 'Cuiabá',
        icon: require('../assets/pin1.png')
    },
    {
        id: '2',
        coordinates: {
            latitude: -20.44278,
            longitude: -54.64639,
        },
        title: 'Campo Grande',
        description: 'Campo Grande',
        category: 1,
        icon: require('../assets/pin1.png')
    },
    {
        id: '3',
        coordinates: {
            latitude: -23.5489,
            longitude: -46.6388,
        },
        title: 'São Paulo',
        description: 'São Paulo',
        category: 1,
        icon: require('../assets/pin2.png')
    },
    {
        id: '4',
        coordinates: {
            latitude: -22.9035,
            longitude: -43.2096,
        },
        title: 'Rio de Janeiro',
        description: 'Rio de Janeiro',
        category: 1,
        icon: require('../assets/pin2.png')
    },
    {
        id: '5',
        coordinates: {
            latitude: -3.71839,
            longitude: -38.5434,
        },
        title: 'Ceará',
        description: 'Ceará',
        category: 1,
        icon: require('../assets/pin3.png')
    },
    {
        id: '6',
        coordinates: {
            latitude: -30.0277,
            longitude: -51.2287,
        },
        title: 'Rio Grande do Sul',
        description: 'Rio Grande do Sul',
        category: 1,
        icon: require('../assets/pin3.png')
    },
    {
        id: '7',
        coordinates: {
            latitude: -9.974,
            longitude: -67.8076,
        },
        title: 'Acre',
        description: 'Acred',
        category: 1,
        icon: require('../assets/pin3.png')
    }
]

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