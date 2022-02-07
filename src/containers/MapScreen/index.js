import { View, StyleSheet} from "react-native";

import {Box,Fab, FlatList,  HStack,  Text} from "native-base";
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Navigation} from "react-native-navigation";
import {CustomStatusBar} from "../../components/StatusBar/CustomStatusBar";
import {useSelector} from "react-redux";
// import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

export const MapScreen = (props) => {

    const {savedLocations} = useSelector((state) => state.weather)

    return (
        <SafeAreaProvider style={{flex: 1}}>
            <CustomStatusBar backgroundColor={'#ffffff'}/>

            <HStack alignItems={'center'}>
                <Icon name={"chevron-left"}
                      onPress={() => Navigation.pop(props.componentId)}
                      style={{
                          fontSize: 20,
                          padding:10,
                          marginRight: '20%',
                          color: 'grey'
                      }}
                />
                <Text fontSize={'xl'}>Map View</Text>
            </HStack>
            <View>
                { Array.isArray(savedLocations) && savedLocations.length>0 ? <Text>We have the data here</Text> : <Text>You have not saved any locations</Text> }

                {/*<MapView*/}
                {/*    provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/}
                {/*    style={styles.map}*/}
                {/*    region={{*/}
                {/*        latitude: 37.78825,*/}
                {/*        longitude: -122.4324,*/}
                {/*        latitudeDelta: 0.015,*/}
                {/*        longitudeDelta: 0.0121,*/}
                {/*    }}*/}
                {/*>*/}
                {/*</MapView>*/}

            </View>


        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

MapScreen.options = {
    topBar: {
        visible: false,
    }
}


export default MapScreen
