import {View, Image} from "react-native";
import React from "react";
import {Box, HStack, Text } from "native-base";
import {daysOfTheWeek, kelvinToCelcius} from "../../../utils/functions";
import moment from "moment";

export const ForecastView = (props) => {
    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'Clouds':
                return require( '../../../utils/images/icons/cloudy.png')
            case 'Rain':
                return require( '../../../utils/images/icons/rain.png')

            case 'Clear':
                return require( '../../../utils/images/icons/sunny.png')

            default:
                return require( '../../../utils/images/icons/sunny.png')
                break;
        }

    }
    return (
        <HStack p={3} justifyContent={'space-between'}>
            <Box>
                <Text color={'white'}>{daysOfTheWeek(moment(props.item.item.dt_txt).day())} ({props.item.item.weather[0].main})</Text>
                <Text color={'white'}>{moment(props.item.item.dt_txt).format("hh:mm:ss a")}</Text>
            </Box>
            <Box>
                <Image source={getWeatherIcon(props.item.item.weather[0].main)} style={{width:20, height:20}}/>
            </Box>
            <Box>
                <Text color={'white'}>{kelvinToCelcius(props.item.item.main.temp)}°</Text>
            </Box>
        </HStack>
    );
}
