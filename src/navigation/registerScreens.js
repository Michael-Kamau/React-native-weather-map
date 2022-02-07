import React from 'react';
import {Provider} from 'react-redux';
import store from '../redux';
import {Navigation} from 'react-native-navigation';

import Root from "../containers/Root";
import App from "../../App";
import Home from "../containers/Home";
import SavedLocations from "../containers/SavedLocations";
import MapScreen from "../containers/MapScreen";

export const registerScreens = () => {
    //Root Screen
    Navigation.registerComponent("App", () => (props) =>
        <Provider store={store}>
            <Root PassedComponent={App} componentProps={props}/>
        </Provider>, () => App);

    Navigation.registerComponent("Home", () => (props) =>
        <Provider store={store}>
            <Root PassedComponent={Home} componentProps={props}/>
        </Provider>, () => Home);

    Navigation.registerComponent("SavedLocations", () => (props) =>
        <Provider store={store}>
            <Root PassedComponent={SavedLocations} componentProps={props}/>
        </Provider>, () => SavedLocations);

    Navigation.registerComponent("MapScreen", () => (props) =>
        <Provider store={store}>
            <Root PassedComponent={MapScreen} componentProps={props}/>
        </Provider>, () => MapScreen);

};
