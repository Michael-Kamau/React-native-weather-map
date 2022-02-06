import React, {useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {ImageBackground, PermissionsAndroid, Platform, ScrollView, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {CustomStatusBar} from "../../components/StatusBar/CustomStatusBar";
import useAxios from "../../hooks/Network/useAxios";
import {fetchCurrentWeatherConfig, fetchForecastWeatherConfig} from "../../utils/apis/requestConfigs";
import {saveForecastWeatherStatus, saveWeatherStatus} from "../../redux/weatherSlice";
import CurrentView from "./views/CurrentView";
import {Box, Fab, FlatList, Spinner, View} from "native-base";
import {ForecastView} from "./views/ForecastView";
import {colorStates} from "../../utils/styles/colors";
import Geolocation from '@react-native-community/geolocation';
import NoDataView from "./views/NoDataView";
import {Navigation} from "react-native-navigation";


export const Home = (props) => {
    const {forecastDetails, details} = useSelector((state) => state.weather)

    const [colorsState, setColorsState] = useState({name: '', image: ''})
    const [locationState, setLocationState] = useState({latitude: '', longitude: ''})

    const dispatch = useDispatch()

    useEffect(() => {
        setColorsState(colorStates(details?.weather ? details?.weather[0].main : 'default'))
    }, [details])

    const {
        loading: loadingCurrentWeather,
        sendRequest: currentWeatherRequest
    } = useAxios()
    const {
        loading: loadingForecastWeather,
        sendRequest: forecastWeatherRequest
    } = useAxios()


    const fetchCurrentWeather = (lat, lon) => {
        currentWeatherRequest(fetchCurrentWeatherConfig(lat, lon), (data) => {
            if (data.weather) {
                dispatch(saveWeatherStatus(data, true))
            }
        })
    }
    const fetchForecastWeather = (lat, lon) => {
        forecastWeatherRequest(fetchForecastWeatherConfig(lat, lon), (data) => {
            if (data?.list) {
                dispatch(saveForecastWeatherStatus(data, true))
            }
        })
    }

    const checkPermissions = async () => {

        if (Platform.OS === 'ios') {
            getCurrentLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'React Native Weather  Map Location',
                        message: 'We need to access your location to get the weather of your current location',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation()
                } else {
                    // Permission Denied
                    alert('Location Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {

                const currentLongitude = JSON.stringify(position.coords.longitude);

                const currentLatitude = JSON.stringify(position.coords.latitude);

                setLocationState({latitude: currentLatitude, longitude: currentLongitude});
            },
            (error) => {
                console.log('error.message', error)
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };


    useEffect(() => {
        checkPermissions().then(() => {
        })
    }, [])

    useEffect(() => {
        if (locationState.latitude && locationState.longitude) {
            fetchCurrentWeather(locationState.latitude, locationState.longitude)
            fetchForecastWeather(locationState.latitude, locationState.longitude)
        }
    }, [locationState])


    return (
        <SafeAreaProvider style={{backgroundColor: colorsState?.forecastBackground}}>
            <CustomStatusBar backgroundColor={colorsState?.statusBarColor}/>
            <View style={{paddingBottom:60}}>
                {details.weather ? <CurrentView loading={loadingCurrentWeather || loadingForecastWeather}/> : <NoDataView loading={loadingCurrentWeather || loadingForecastWeather}/>}
                {loadingCurrentWeather || loadingForecastWeather && <Spinner color={'white'}/>}

                {
                    Array.isArray(forecastDetails.list) &&
                    <FlatList
                        data={forecastDetails.list}
                        renderItem={item => <ForecastView item={item}/>}
                    />
                }
            </View>

            <Box position="relative" h={100} w="100%">
                <Fab position="absolute" size="sm" icon={<Icon onPress={()=>checkPermissions()} name={"refresh"} style={{color:colorsState?.forecastBackground, fontSize:20}}/>}  style={{backgroundColor:'white'}} />

                <Fab right={330} bottom={5} size="sm" icon={<Icon onPress={()=> {
                    Navigation.push(props.componentId,
                        {
                            component: {
                                name: 'SavedLocations'
                            }
                        })
                }} name={"hexagram-outline"} style={{color:colorsState?.forecastBackground, fontSize:20}}/>}  style={{backgroundColor:'white'}} />
            </Box>

        </SafeAreaProvider>
    );
}


Home.options = {
    topBar: {
        visible: false,
    }
}

export default Home;
