import {Alert, Dimensions, Image, Modal, StyleSheet, View, Text, AppRegistry} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {image4ioApiKey, image4ioApiSecret, serverIp, usingServer} from "../localProperties";
import {Button} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { encode } from 'js-base64';

export default function MapScreen({navigation, route}) {

    const {loggedUser} = route.params;
    const [pins, setPins] = useState([]);
    const [region, setRegion] = useState({latitude: 0, longitude: 0, latitudeDelta: 20, longitudeDelta: 20});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState({});
    const [imageUri, setImageUri] = useState(null);
    const [localPic, setLocalPic] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);

    useEffect(async () => {
        await permissionFunction();
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
                    //TODO sustituir por coordenadas propias
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
                    username: 'cdondovich',
                    lastUpdated: Date.now()
                },
                {
                    id: 2,
                    coordinates: {latitude: -34.611257, longitude: -58.3801285},
                    username: 'amelian'
                },
                {
                    id: 3,
                    coordinates: {latitude: -34.621257, longitude: -58.3901285},
                    username: 'drojas'
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

    const setMarker = (marker) => {
        if (marker.username === loggedUser) {
            if (!localPic) {
                let uri = 'https://cdn.image4.io/deruta/misc/nopic.png';
                if (marker.lastUpdated) {
                    uri = 'https://cdn.image4.io/deruta/avatars/' + marker.username + '.png?t=' + marker.lastUpdated;
                }
                setLocalPic(uri);
                setImageUri(uri);
            } else {
                setImageUri(localPic);
            }
        } else {
            if (marker.lastUpdated) {
                setImageUri('https://cdn.image4.io/deruta/avatars/' + marker.username + '.png?t=' + marker.lastUpdated);
            } else {
                setImageUri('https://cdn.image4.io/deruta/misc/nopic.png');
            }
        }
        setSelectedMarker(marker);
        setModalVisible(true);
    }

    const mapMarkers = () => {
        return pins.map((marker) => <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinates}
            title={marker.username}
            onCalloutPress={() => {setMarker(marker)}}
        >
            <Image source={require('../assets/pin3.png')} style={{height: 32, width: 32}}/>
        </MapView.Marker>)
    }

    const permissionFunction = async () => {
        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log("imagePermission: " + imagePermission.status);
        setGalleryPermission(imagePermission.status === 'granted');
        if (imagePermission.status !== 'granted') {
            console.log('Permission for media access needed.');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [1,1]
        });
        if (!result.cancelled) {
            setLocalPic(result.uri);
            setImageUri(result.uri);
            let body = new FormData();
            body.append('image', {uri: result.uri, name: loggedUser + '.png', type: 'image/png'});
            body.append('useFilename', 'true');
            body.append('overwrite', 'true');
            body.append('path', '/avatars');
            await fetch(
                'https://api.image4.io/v1.0/uploadImage', {
                    method: 'post',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Basic ' + encode(image4ioApiKey + ':' + image4ioApiSecret)
                    },
                    body: body
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    fetch(
                        'https://api.image4.io/v1.0/purge', {
                            method: 'delete',
                            mode: 'no-cors',
                            headers: {
                                'Authorization': 'Basic ' + encode(image4ioApiKey + ':' + image4ioApiSecret)
                            }
                        }
                    ).then(() => {selectedMarker.lastUpdated = Date.now()});
                })
                .catch((e) => console.log(e))
        }
    };

    const showChangePictureButton = (username) => {
        return loggedUser === username ? <View style={{flex:1, flexDirection: 'column-reverse'}}>
            <Button
                buttonStyle={styles.modalButtonStyle}
                title={"CHANGE PICTURE"}
                onPress={pickImage}>
            </Button>
        </View>
            :
        <View style={{flex:1, flexDirection: 'column-reverse'}}></View>
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent
                animationType={"fade"}>
                <View style={{flex:1}}></View>
                <View
                    style={styles.centeredView}>
                    <View style={{flex:1}}></View>
                    <View
                        style={styles.modalStyle}>
                        <View style={{paddingTop: 20}}>
                            <Image
                                style={styles.image}
                                source={{uri: imageUri}}
                                defaultSource={require('../assets/nopic.png')}/>
                        </View>
                        <View style={{flex:1, paddingTop: 20}}>
                            <Text
                                style={styles.modalTitle}>
                                {selectedMarker.username}
                            </Text>
                        </View>
                        <View style={{flex:2, padding: 20}}>
                            <Text
                                style={styles.modalText}>
                                {selectedMarker.coordinates ? selectedMarker.coordinates.latitude : ''}
                            </Text>
                            <Text
                                style={styles.modalText}>
                                {selectedMarker.coordinates ? selectedMarker.coordinates.longitude : ''}
                            </Text>
                        </View>
                        {showChangePictureButton(selectedMarker.username)}
                        <View style={{flex:1, flexDirection: 'column-reverse', paddingBottom: 20}}>
                            <Button
                                buttonStyle={styles.modalButtonStyle}
                                title={"CLOSE"}
                                onPress={() => setModalVisible(false)}>
                            </Button>
                        </View>

                    </View>
                    <View style={{flex:1}}></View>
                </View>
                <View style={{flex:1}}></View>
            </Modal>
            <MapView
                customMapStyle={mapStyle}
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                loadingEnabled={true}
                mapType="standard"
                initialRegion={{latitude: 0, longitude: 0, latitudeDelta: 20, longitudeDelta: 20}}
                region={region}>
                {mapMarkers()}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 35
    },
    centeredView: {
        flex: 3,
        flexDirection: 'row',
    },
    modalStyle: {
        flex: 5,
        backgroundColor: '#ddd',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 3, borderColor: '#bbb'
    },
    modalTitle: {
        fontSize: 30,
        fontWeight: 'bold'

    },
    modalText: {
        fontSize: 20

    },
    modalButtonStyle: {
        borderRadius: 10
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#35CE8D'
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