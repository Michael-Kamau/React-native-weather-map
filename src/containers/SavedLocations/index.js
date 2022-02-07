import {View} from "react-native";

import {Box, Fab, FlatList, HStack, Text} from "native-base";
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Navigation} from "react-native-navigation";
import {CustomStatusBar} from "../../components/StatusBar/CustomStatusBar";
import SavedLocationView from "./views/SavedLocationView";
import {useSelector} from "react-redux";

export const SavedLocations = (props) => {

    const {savedLocations} = useSelector((state) => state.weather)

    return (
        <SafeAreaProvider style={{flex: 1}}>
            <CustomStatusBar backgroundColor={'#ffffff'}/>

            <HStack alignItems={'center'}>
                <Icon name={"chevron-left"}
                      onPress={() => Navigation.pop(props.componentId)}
                      style={{
                          fontSize: 20,
                          padding: 10,
                          marginRight: '20%',
                          color: 'grey'
                      }}
                />
                <Text fontSize={'xl'}>Saved Locations</Text>
            </HStack>
            <View>
                {Array.isArray(savedLocations) && savedLocations.length > 0 ? <FlatList
                    data={savedLocations}
                    renderItem={item => <SavedLocationView item={item}/>}
                /> : <Text>You have not saved any locations</Text>}

            </View>
            <Box position="relative" h={100} w="100%">
                <Fab position="absolute" size="sm" icon={<Icon onPress={() => Navigation.push(props.componentId,
                    {
                        component: {
                            name: 'MapScreen'
                        }
                    })} name={"map"} style={{color: 'blue', fontSize: 20}}/>} style={{backgroundColor: 'white'}}/>
            </Box>

        </SafeAreaProvider>

    )
}

SavedLocations.options = {
    topBar: {
        visible: false,
    }
}


export default SavedLocations
