import {createSlice} from "@reduxjs/toolkit";
import {AsyncStorage} from "react-native";
import moment from "moment";

const weatherSlice = createSlice({
    name: "profile",
    initialState: {
        details: {},
        forecastDetails: {},
        savedLocations: []
    },
    reducers: {
        updateWeatherStatus: (state, action) => {
            state.details = action.payload
        },
        updateForecastWeatherStatus: (state, action) => {
            state.forecastDetails = action.payload
        },
        updateSavedLocations: (state, action) => {
            state.savedLocations = action.payload
        },
    }
})

export const WEATHER_ACTIONS = weatherSlice.actions

export const saveWeatherStatus = (data, shouldUpdate) => {
    return async (dispatch) => {
        if (shouldUpdate) {
            data.updated_at = String(new Date())
            dispatch(WEATHER_ACTIONS.updateWeatherStatus(data))
            try {
                const convertedWeatherData = JSON.stringify(data)
                await AsyncStorage.setItem(
                    '@MyWeatherStore:LatestWeather',
                    convertedWeatherData
                );
            } catch (error) {
                console.log('Error')
            }
        } else {
            dispatch(WEATHER_ACTIONS.updateWeatherStatus(data))
        }

    }
}

export const saveForecastWeatherStatus = (data, shouldUpdate) => {
    return async (dispatch) => {

        if (shouldUpdate) {
            data.updated_at = String(new Date())
            dispatch(WEATHER_ACTIONS.updateForecastWeatherStatus(data))
            try {
                const convertedWeatherData = JSON.stringify(data)
                await AsyncStorage.setItem(
                    '@MyWeatherStore:LatestForecastWeather',
                    convertedWeatherData
                );
            } catch (error) {
                console.log('Error')
            }
        } else {
            dispatch(WEATHER_ACTIONS.updateForecastWeatherStatus(data))
        }
    }
}

export const saveWeatherLocation = (data) => {
    return async (dispatch) => {

        dispatch(WEATHER_ACTIONS.updateSavedLocations(data))
        try {
            const convertedWeatherData = JSON.stringify(data)
            await AsyncStorage.setItem(
                '@MyWeatherStore:SavedLocations',
                convertedWeatherData
            );
        } catch (error) {
            console.log('Error')
        }
    }
}
export default weatherSlice.reducer
