import {View} from "react-native";
import React from "react";
import {Box, HStack, Text} from "native-base";
import {kelvinToCelcius} from "../../../utils/functions";

export const ForecastView = (props) => {
    return (
        <HStack p={3} justifyContent={'space-between'}>
            <Box>
                <Text color={'white'}>Tuesday</Text>
                <Text color={'white'}>4:30pm</Text>
            </Box>
            <Box>
                <Text color={'white'}>--</Text>
            </Box>
            <Box>
                <Text color={'white'}>{kelvinToCelcius(props.item.item.main.temp)}°</Text>
            </Box>
        </HStack>
    );
}
