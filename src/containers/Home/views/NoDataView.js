import {ImageBackground, StyleSheet, Linking, View, Platform} from "react-native";
import DeviceInfo from 'react-native-device-info';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'

import {Box, Button, Center, Heading, HStack, Spinner, Text, VStack} from "native-base";
import React from "react";

export const NoDataView = (props) => {
    const openAppSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
        } else {
            const packageName= DeviceInfo.getBundleId();
            IntentLauncher.startActivity({
                action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
                data: 'package:' + packageName
            })
        }
    }

    return (
        <View style={{borderBottomWidth: 0, borderBottomColor: 'white'}}>
        <ImageBackground source={require('../../../utils/images/forest_sunny.png')} resizeMode="cover"
                             style={styles.image}>


            </ImageBackground>
            {props.loading ?
                <Spinner color={'white'}/>
                :
                <Center p={3}>
                <Heading color={'white'} size="sm">No Data to Display</Heading>
                <Text color={'white'} >Please ensure you have an active internet connection and you have granted the application permission to access your location then press the refresh button to reload.</Text>
                <Button
                    w={{
                        base: "85%",
                        md: "25%",
                    }}
                    mt={4}

                    onPress={()=>openAppSettings()}

                >Check location permission status</Button>
            </Center>}

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        // flex:1,
        justifyContent: "center",
        width: '100%',
        paddingTop: 180,
        paddingBottom: 150,
    },
});

export default NoDataView
