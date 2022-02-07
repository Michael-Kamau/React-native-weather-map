import React, {useEffect} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {ImageBackground, ScrollView, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {CustomStatusBar} from "../../components/StatusBar/CustomStatusBar";
import {theme} from "../../utils/styles/theme";
import useAxios from "../../hooks/Network/useAxios";
import {fetchCurrentWeatherConfig, fetchForecastWeatherConfig} from "../../utils/apis/requestConfigs";
import {saveForecastWeatherStatus, saveWeatherStatus} from "../../redux/weatherSlice";
import {Box, Text} from "native-base";

export const Home = (props) => {
    const {details, forecast} = useSelector((state) => state.weather)

    const dispatch= useDispatch()

    const {loading: loadingCurrentWeather, data: currentWeatherData, error: currentWeatherError, sendRequest: currentWeatherRequest} = useAxios()
    const {loading: loadingForecastWeather, data: forecastWeatherData, error: forecastWeatherError, sendRequest: forecastWeatherRequest} = useAxios()


    const fetchCurrentWeather = (lat,lon) => {
        currentWeatherRequest(fetchCurrentWeatherConfig(lat,lon), (data) => {
            if(data.weather){
                dispatch(saveWeatherStatus(data))
            }
        })
    }
    const fetchForecastWeather = (lat,lon) => {
        currentWeatherRequest(fetchForecastWeatherConfig(lat,lon), (data) => {
            if(data?.list){
                dispatch(saveForecastWeatherStatus(data))
            }
        })
    }

    useEffect(() => {
       fetchCurrentWeather('-1.292066','36.821945')
        fetchForecastWeather('-1.292066','36.821945')
    }, [])

    return (
        <SafeAreaProvider style={{flex: 1}}>
            <CustomStatusBar backgroundColor={theme.colors.primary["700"]}/>
            <ScrollView contentContainerStyle={{paddingBottom: 60}}>
                <ImageBackground source={require('../../utils/images/forest_cloudy.png')} resizeMode="cover" style={styles.image}>
                    <Box p={3}>
                        <Text >Inside</Text>
                        <Text >Inside</Text>


                    </Box>
                </ImageBackground>


            </ScrollView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width:'100%',
        height:70
    },
});


Home.options = {
    topBar: {
        visible: false,
    }
}

export default Home;
