// import * as API from "./endPoints.js";

import {getCurrentWeather, getForecastWeather} from "./endpoints";

export const fetchCurrentWeatherConfig = (lat, lon) => {
    return {
        method: 'GET',
        endpoint: getCurrentWeather(lat, lon),
    }
}

export const fetchForecastWeatherConfig = (lat, lon) => {
    return {
        method: 'GET',
        endpoint: getForecastWeather(lat, lon),
    }
}

