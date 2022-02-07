import {HStack, Text,} from "native-base";
import React from "react";
import {TouchableOpacity} from "react-native";
export const SavedLocationView = (props) => {

    return (
        <TouchableOpacity>
            <HStack  justifyContent={'space-between'} mx={2} p={4} mt={5} shadow="3" borderRadius="md" bg={'rgba(84,113,122,0.33)'}>
                <Text>{props?.item?.item?.name}</Text>
                <Text>Cordinates ({props?.item?.item?.coord.lat},{props?.item?.item?.coord.lon})  </Text>
            </HStack>
        </TouchableOpacity>

    )
}



export default SavedLocationView
