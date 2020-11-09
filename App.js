/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AppleHealthKit from 'rn-apple-healthkit';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  useState,
  Button,
  Alert
} from 'react-native';
import GFit from '../MyProj/gfit';
import { connect, getStepCountToday2, getHeartRate, getBloodPressure } from '../MyProj/layer';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function ConnectToApp(){
  try {
   connect();
  } catch (error) {
    throw new Error(`Failed to connect: ${error}`);
  }
};

let fetch2Date = {
  startDate: new Date(2020, 1, 1).toISOString(),
  endDate: new Date(2020, 11, 11).toISOString()

};
const CounterSteps = () => {
  const [ counterSteps, setCounterSteps ] = React.useState("");
  getStepCountToday2(fetch2Date, setCounterSteps).then(x => {console.log(x)});
  return (
      <>
          <Text>Steps: {counterSteps}</Text>
      </>
  )
}

const CounterHeartRate = () => {
  const [ counterHeartRate, setCounterHeartRate ] = React.useState("");
  // getBloodPressure(new Date(2016,4,27), new Date(), setCounterHeartRate).then(res => {console.log(res)});
  return (
      <>
          <Text>HeartRate: {counterHeartRate}</Text>
      </>
  )
}
const handleClick = () => {
  alert('Button clicked!');
}

const CounterDistanceCycling = () => {
  const [ counterDistanceCycling, setCounterDistanceCycling ] = React.useState("");
  // getDistanceCycling(setCounterDistanceCycling);
  console.log("CYCLING ")
  console.log(counterDistanceCycling);
  return (
    <>
        <Text>Distance Cycled: {counterDistanceCycling}</Text>
    </>
)

}



const App = () =>{
  state = {
    counterSteps: 0,
    counterHeartRate: []
  }

  console.log("init");
  ConnectToApp();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
              
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button
                title="Press me for steps"
                onPress={()=> handleClick()}
              />

              <CounterSteps></CounterSteps>
              <CounterHeartRate></CounterHeartRate>
              <CounterDistanceCycling></CounterDistanceCycling>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
