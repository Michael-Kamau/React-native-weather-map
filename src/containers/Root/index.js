import React, {useEffect, useState} from 'react';
import {LogBox} from "react-native";
import {NativeBaseProvider} from "native-base";
import NetInfo from "@react-native-community/netinfo";
import Snackbar from "react-native-snackbar";

import {theme} from "../../utils/styles/theme";



LogBox.ignoreLogs(['NativeBase:']);


const Root = ({PassedComponent, componentProps}) => {

    const [isConnected, setConnectionStatus] = useState(false)

    useEffect(() => {
        const unsubScribeNetInfo = NetInfo.addEventListener(networkState => {
            console.log("Is connected? - ", networkState);
            if (networkState.isConnected != isConnected) {
                setConnectionStatus(networkState.isConnected)
            }

            if (networkState.isConnected == true) {
                Snackbar.dismiss()
            } else {
                Snackbar.show({
                    text: 'You have lost your network connection',
                    duration: Snackbar.LENGTH_INDEFINITE,
                });
            }
        });
        return () => {
            // Anything in here is fired on component unmount.
            unsubScribeNetInfo()
        }
    }, [])

    return (
        <NativeBaseProvider theme={theme}>
            <PassedComponent {...componentProps} />
        </NativeBaseProvider>
    )
};
export default Root;
