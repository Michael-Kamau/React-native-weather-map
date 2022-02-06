import {ImageBackground, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Box, Center, Heading, HStack, Text, VStack} from "native-base";
import {kelvinToCelcius} from "../../../utils/functions";
import {useSelector} from "react-redux";
import moment from "moment";

export const CurrentView = () => {
    const {details} = useSelector((state) => state.weather)

    const [weatherState, setWeatherState] = useState({
        name: 'Sunny',
        image: require('../../../utils/images/forest_sunny.png')
    })

    const updateWeatherState = (weather) => {
        switch (weather) {
            case 'Clouds':
                setWeatherState({name: 'Cloudy', image: require('../../../utils/images/forest_cloudy.png')})
                break;

            case 'Rain':
                setWeatherState({name: 'Rainy', image: require('../../../utils/images/forest_rainy.png')})
                break;

            case 'Clear':
                setWeatherState({name: 'Sunny', image: require('../../../utils/images/forest_sunny.png')})
                break;

            default:
                setWeatherState({name: 'Sunny', image: require('../../../utils/images/forest_sunny.png')})
                break;
        }

    }

    useEffect(() => {
        updateWeatherState(details?.weather ? details?.weather[0]?.main : 'default')
    }, [details])

    return (
        <View style={{borderBottomWidth: 1, borderBottomColor: 'white'}}>
            <ImageBackground source={weatherState.image} resizeMode="cover"
                             style={styles.image}>
                <Center p={3}>
                    <Heading color={'white'} size="2xl">{kelvinToCelcius(details?.main?.temp)}°</Heading>
                    <Heading color={'white'} size="2xl">{weatherState.name}</Heading>
                </Center>
            </ImageBackground>
            <HStack p={2} justifyContent={'space-between'}>
                <Box>
                    <Text color={'white'}>{kelvinToCelcius(details?.main?.temp_min)}°</Text>
                    <Text color={'white'}>Min</Text>
                </Box>
                <Box>
                    <Text color={'white'}>{kelvinToCelcius(details?.main?.temp)}°</Text>
                    <Text color={'white'}>Current</Text>
                </Box>
                <Box>
                    <Text color={'white'}>{kelvinToCelcius(details?.main?.temp_max)}°</Text>
                    <Text color={'white'}>Max</Text>
                </Box>
            </HStack>
            <Text color={'white'}>Last updated: {moment(details?.updated_at).format('MM/DD/YYYY')} at {moment(details?.updated_at).format("hh:mm:ss a")}</Text>



        </View>
    );
}

const styles = StyleSheet.create({

    image: {
        // flex:1,
        justifyContent: "center",
        width: '100%',
        paddingTop: 80,
        paddingBottom: 120,
    },
});

export default CurrentView
