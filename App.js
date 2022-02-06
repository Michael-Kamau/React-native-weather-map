/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
    Text,
    View,
    AsyncStorage
} from 'react-native';

import {moveToHomeScreen} from "./src/navigation";
import {CustomStatusBar} from "./src/components/StatusBar/CustomStatusBar";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {Heading, Spinner, theme} from "native-base";
import {saveForecastWeatherStatus, saveWeatherLocation, saveWeatherStatus} from "./src/redux/weatherSlice";
import {useDispatch} from "react-redux";


const App = () => {
    const dispatch = useDispatch()

    const retrieveLatestWeatherData = async () => {
        try {
            const value = await AsyncStorage.getItem('@MyWeatherStore:LatestWeather');
            if (value !== null) {
                dispatch(saveWeatherStatus(JSON.parse(value),false))
            }else{
                console.log('NO VALUE FOUND');
            }
        } catch (error) {

        }
    };

    const retrieveLatestForecastWeatherData = async () => {
        try {
            const value = await AsyncStorage.getItem('@MyWeatherStore:LatestForecastWeather');
            if (value !== null) {
                dispatch(saveForecastWeatherStatus(JSON.parse(value),false))
            }else{
                console.log('NO VALUE FOUND');
            }
        } catch (error) {

        }
    };

    const retrieveSavedLocationsData = async () => {
        try {
            const value = await AsyncStorage.getItem('@MyWeatherStore:SavedLocations');
            if (value !== null) {
                dispatch(saveWeatherLocation(JSON.parse(value),false))
            }else{
                console.log('NO VALUE FOUND');
            }
        } catch (error) {

        }
    };



    useEffect(() => {
        retrieveLatestWeatherData().then(()=>{
            retrieveLatestForecastWeatherData().then(()=>{
                retrieveSavedLocationsData()
                moveToHomeScreen()
            })

        })
        // setTimeout(() => {
        //     moveToHomeScreen()
        // }, 1500)

    });
    return (
        <SafeAreaProvider>
            <CustomStatusBar backgroundColor={theme.colors.primary["700"]}/>
            <View style={{
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                backgroundColor: theme.colors.primary['700']
            }}>
                <Spinner/>
                <Heading style={{
                    color: 'white',
                    textAlign: 'center'
                }}>Welcome</Heading>
                <Text style={{
                    color: 'white',
                    textAlign: 'center',
                }}>React Native Open Weather Map</Text>
            </View>
        </SafeAreaProvider>
    )
};
export default App;
