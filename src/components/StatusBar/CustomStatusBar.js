import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";
import {StatusBar} from "native-base";
import React from "react";

export const CustomStatusBar = (
    {
        backgroundColor,
        barStyle = "dark-content",
    }
) => {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ height: insets.top, backgroundColor }}>
            <StatusBar
                animated={true}
                backgroundColor={backgroundColor}
                barStyle={barStyle} />
        </View>
    );
}
