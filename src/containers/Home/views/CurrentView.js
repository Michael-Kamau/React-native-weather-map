import {ImageBackground, StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Box, Center, Heading, HStack, Text, VStack} from "native-base";
import {kelvinToCelcius} from "../../../utils/functions";
import {useSelector} from "react-redux";

export const CurrentView = () => {
    const {details} = useSelector((state) => state.weather)

    const [weatherState, setWeatherState] = useState({name: '', image: ''})

    const updateWeatherState = () => {
        switch (details?.weather[0]?.main) {
            case 'Clouds':
                setWeatherState({name: 'Cloudy', image: require('../../../utils/images/forest_cloudy.png')})
                break;

            case 'Rain':
                setWeatherState({name: 'Rainy', image: require('../../../utils/images/forest_rainy.png')})
                break;

            case 'Sun':
                setWeatherState({name: 'Sunny', image: require('../../../utils/images/forest_sunny.png')})
                break;
        }

    }

    useEffect(() => {
        if(details.weather){
            updateWeatherState()
        }
    }, [details])

    return (
        <View style={{borderBottomWidth:1, borderBottomColor:'white'}}>
            <ImageBackground source={weatherState.image} resizeMode="cover"
                             style={styles.image}>
                <Center p={3}>
                    <Heading color={'white'}  size="2xl">{kelvinToCelcius(details?.main?.temp)}°</Heading>
                    <Heading color={'white'}  size="2xl">{weatherState.name}</Heading>
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        justifyContent: "center",
        width: '100%',
        paddingTop:80,
        paddingBottom:120,
    },
});

export default CurrentView
