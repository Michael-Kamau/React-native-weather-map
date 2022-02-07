let appId = ''

export const getCurrentWeather = (lat, lon) => {
    return `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
}

export const getForecastWeather = (lat, lon) => {
    return `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}`
}
