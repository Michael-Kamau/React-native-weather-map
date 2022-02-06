import React, {useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {ImageBackground, ScrollView, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {CustomStatusBar} from "../../components/StatusBar/CustomStatusBar";
import {theme} from "../../utils/styles/theme";
import useAxios from "../../hooks/Network/useAxios";
import {fetchCurrentWeatherConfig, fetchForecastWeatherConfig} from "../../utils/apis/requestConfigs";
import {saveForecastWeatherStatus, saveWeatherStatus} from "../../redux/weatherSlice";
import CurrentView from "./views/CurrentView";
import {FlatList, View} from "native-base";
import {ForecastView} from "./views/ForecastView";
import {colorStates} from "../../utils/styles/colors";

export const Home = (props) => {
    const {forecastDetails, details} = useSelector((state) => state.weather)

    const [colorsState, setColorsState] = useState({name: '', image: ''})

    const dispatch = useDispatch()

    useEffect(() => {
        if(details.weather){
          setColorsState(colorStates(details?.weather[0].main))
        }
    }, [details])

    const {
        loading: loadingCurrentWeather,
        data: currentWeatherData,
        error: currentWeatherError,
        sendRequest: currentWeatherRequest
    } = useAxios()
    const {
        loading: loadingForecastWeather,
        data: forecastWeatherData,
        error: forecastWeatherError,
        sendRequest: forecastWeatherRequest
    } = useAxios()


    const fetchCurrentWeather = (lat, lon) => {
        currentWeatherRequest(fetchCurrentWeatherConfig(lat, lon), (data) => {
            if (data.weather) {
                dispatch(saveWeatherStatus(data))
            }
        })
    }
    const fetchForecastWeather = (lat, lon) => {
        currentWeatherRequest(fetchForecastWeatherConfig(lat, lon), (data) => {
            if (data?.list) {
                dispatch(saveForecastWeatherStatus(data))
            }
        })
    }

    useEffect(() => {
        fetchCurrentWeather('-1.292066', '36.821945')
        fetchForecastWeather('-1.292066', '36.821945')
    }, [])

    return (
        <SafeAreaProvider style={{ backgroundColor: colorsState.forecastBackground}}>
            <CustomStatusBar backgroundColor={colorsState.statusBarColor}/>
            {console.log('COlor states are as below',colorsState)}
            <View >
                <CurrentView/>
            </View>
            {
                Array.isArray(forecastDetails.list) &&
                <FlatList
                    data={forecastDetails.list}
                    renderItem={item => <ForecastView item={item}/>}
                />
            }
        </SafeAreaProvider>
    );
}


Home.options = {
    topBar: {
        visible: false,
    }
}

export default Home;
