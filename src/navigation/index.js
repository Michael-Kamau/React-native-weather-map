import {registerScreens} from './registerScreens';
import {Navigation} from 'react-native-navigation';


const setAppDefaultOptions = () =>
    Navigation.setDefaultOptions({
        topBar: {
            elevation: 0,
            backgroundColor: "#fff",
            leftButtonColor: "black",
            barStyle: "default",
            noBorder: true,
            background: {
                color: "#fff",
                translucent: true,
                blur: false
            },
            backButton: {
                color: "#000",
                visible: true
            }
        },
        header: {visible: false},
        statusBar: {
            backgroundColor: "#fff",
            style: "light"
        },
        layout: {
            orientation: ["portrait"]
        }
    });


export const goToAppRootInitializer = () => {
    registerScreens()
    Navigation.events().registerAppLaunchedListener(() => {
        setAppDefaultOptions();
        Navigation.setRoot({
            root: {
                stack: {
                    id: "App",
                    children: [
                        {
                            component: {
                                name: "App"
                            }
                        }
                    ],
                    options: {
                        topBar:
                            {
                                visible: false,
                                height: 0,
                            }
                    }
                }
            }
        })
    })

}

export function moveToHomeScreen() {
    registerScreens();
    Navigation.setRoot({
        root: {
            stack: {
                id: "Home",
                children: [
                    {
                        component: {
                            name: "Home"
                        }
                    }
                ],
                options: {
                    topBar:
                        {
                            visible: true,
                            backButton: {
                                visible: false
                            }
                        }
                }
            }
        }
    })
}
