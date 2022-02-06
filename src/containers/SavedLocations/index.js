import {ImageBackground, StyleSheet, Linking, View, Platform} from "react-native";
import DeviceInfo from 'react-native-device-info';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'

import {Box, Button, Center, FlatList, Heading, HStack, Spinner, Text, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Navigation} from "react-native-navigation";
import {CustomStatusBar} from "../../components/StatusBar/CustomStatusBar";
import SavedLocationView from "./views/SavedLocationView";
import {useSelector} from "react-redux";
import {ForecastView} from "../Home/views/ForecastView";

export const SavedLocations = (props) => {

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
                <Text fontSize={'xl'}>Saved Locations</Text>
            </HStack>
            <View>

                { Array.isArray(savedLocations) && savedLocations.length>0 ? <FlatList
                    data={savedLocations}
                    renderItem={item => <SavedLocationView item={item}/>}
                /> : <Text>You have not saved any locations</Text> }

            </View>

        </SafeAreaProvider>

    )
}

SavedLocations.options = {
    topBar: {
        visible: false,
    }
}


export default SavedLocations
