import {useCallback, useState} from "react";
import {Platform} from 'react-native';
import axios from "axios";
import Snackbar from "react-native-snackbar";


const baseUrl = 'https://api.openweathermap.org/'

const useAxios = () => {
    const [loading, setIsLoading] = useState(false);
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const sendRequest = useCallback(({method, endpoint, content_type, payload, token}, applyData) => {
        console.log('PPPPPPPPAPPPSPSPSP', payload)
        setIsLoading(true);
        const configurationObject = {
            url: `${baseUrl}${endpoint}`,
            method: method,
        };

        configurationObject["headers"] = token ?
            {
                'Accept': '*/*',
                'Content-type': content_type ? content_type : 'application/json',
                'Authorization': `Bearer ${token}`,
            }
            :
            {
                'Accept': '*/*',
                'Content-type': content_type ? content_type : 'application/json',
            }

        payload ? configurationObject["data"] = payload : null;

        console.log('And this is the configuration object', configurationObject)
        axios(configurationObject)
            .then((response) => {
                console.log('Response', response)

                const {data, status} = response
                if (status == 200) {
                    applyData?.(data)
                    // console.log(` You have updated: ${JSON.parse(response.data)}`);

                } else {
                    console.log('here')
                    // throw new Error("An error has occurred");
                }
            })
            .catch((error) => {
                if (error.request) {
                    console.log('error.request', error.request._response)
                    switch (typeof error.request) {
                        case "object":
                            let response = JSON.parse(error.request._response);
                            applyData?.(response)
                            if (response.hasOwnProperty('error')) {
                                Snackbar.show({
                                    text: response.error,
                                    duration: Snackbar.LENGTH_SHORT,
                                });
                            }
                            break
                        default:
                            console.log("HOOK: ====================> Response data is not an object")
                            break
                    }
                } else if (error.response) {
                    console.log('Error.response')
                } else {
                    console.log('Other error', error.message)
                }
            }).finally(() => {
            setIsLoading(false);
        });
    }, [])

    return {loading, data, error, sendRequest}
}

export default useAxios;
