import React, {
    Component
} from 'react';

import {
    View,
    Platform,
    TextInput,
    ImageBackground,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    StatusBar
} from 'react-native';
import GoogleFit, {
    Scopes
} from 'react-native-google-fit'

export default class GFit extends Component {
    state = {
        steps: 0
    }
    startRecording() {
        // Call when authorized
        GoogleFit.startRecording((callback) => {
            console.log('start Recording ')
            // Process data from Google Fit Recording API (no google fit app needed)
        });
    }
    componentDidMount() {
        AsyncStorage.getItem("steps").then((value) => {
            if (value) {
                this.setState({
                    steps: parseInt(value)
                });
                console.log("someone elses app: " + this.state.steps);
            }

        })
        // The list of available scopes inside of src/scopes.js file
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ_WRITE,
                Scopes.FITNESS_BODY_READ_WRITE,
            ],
        }
        GoogleFit.authorize(options)
            .then(authResult => {
                if (authResult.success) {
                    dispatch("AUTH_SUCCESS");
                    alert('success authentification')
                } else {
                    // dispatch("AUTH_DENIED", authResult.message);
                }
            })
            .catch((error) => {

                //dispatch("AUTH_ERROR");
            })

        // ...


        GoogleFit.onAuthorize(() => {
            // console.log('Sucess authentification')

            GoogleFit.observeSteps(async (step) => {
                try {
                    let s = this.state.steps + step.steps
                    await AsyncStorage.setItem(
                        'steps',
                        s + ''
                    );
                } catch (error) {
                    alert(error)
                }
                this.setState({
                    steps: this.state.steps + step.steps
                })


            })

            const options = {
                startDate: "2020-09-01T00:00:17.971Z", // required ISO8601Timestamp
                endDate: new Date().toISOString(), // required ISO8601Timestamp
                bucketUnit: "SECOND", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
                bucketInterval: 1, // optional - default 1. 
            };

        //     GoogleFit.getDailyStepCountSamples(options)
        //         .then((res) => {
        //             // console.log(" This is someone elses code:" + res)
        //             // alert(JSON.stringify(res))
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })

        })

        GoogleFit.onAuthorizeFailure((error) => {
            alert('error when connecting to google account')
        })





    }


    render() {
        return (
            <View>
            </View>
        )
    }

}