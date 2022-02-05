import {createSlice} from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name: "profile",
    initialState: {
        details: {},
        forecastDetails:{}
    },
    reducers: {
        updateWeatherStatus: (state, action) => {
            state.details = action.payload
        },
        updateForecastWeatherStatus: (state, action) => {
            state.forecastDetails = action.payload
        },
    }
})

export const WEATHER_ACTIONS = weatherSlice.actions

export const saveWeatherStatus = (data) => {
    return async (dispatch) => {
        dispatch(WEATHER_ACTIONS.updateWeatherStatus(data))
    }
}
export const saveForecastWeatherStatus = (data) => {
    return async (dispatch) => {
        dispatch(WEATHER_ACTIONS.updateForecastWeatherStatus(data))
    }
}

export default weatherSlice.reducer
