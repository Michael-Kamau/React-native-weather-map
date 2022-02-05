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
} from 'react-native';

import {moveToHomeScreen} from "./src/navigation";
import {CustomStatusBar} from "./src/components/StatusBar/CustomStatusBar";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {Heading, Spinner, theme} from "native-base";


const App = () => {

    useEffect(() => {
        setTimeout(() => {
            moveToHomeScreen()
        }, 1500)

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
