// import { getHeartRate } from 'react-native-health-layer';
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
  Alert,
  
} from 'react-native';
import { connect, getStepCount, getHeartRate, getBloodPressure, getSleepData, getHeight, getWeight } from '../MyProj/layer';
import { NavigationContainer } from '@react-navigation/native';

import {
  Header,
  Colors,
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
  getStepCount(fetch2Date).then(x => {
  setCounterSteps(JSON.stringify(x));
  state.counterSteps = JSON.stringify(x);
});
  return (
      <>
          <Text>Steps</Text>
      </>
  )
}

const CounterHeartRate = () => {
  const [ counterHeartRate, setCounterHeartRate ] = React.useState("");
  getHeartRate(
    {"startDate": new Date(2016,4,27).toISOString(),
    "endDate": new Date().toISOString()
    }).then(res => {
    state.counterHeartRate = JSON.stringify(res);
  });
  return (
      <>
          <Text>HeartRate</Text>
      </>
  )
}

const CounterHeight = () => {
    let options = {
      unit: 'cm',
      startDate:new Date(2016, 10, 23).toISOString(),
      };
  getHeight(options).then(res => {
    state.counterHeight = JSON.stringify(res);
  });
  return (
      <>
          <Text>Height</Text>
      </>
  )
}

const CounterSleep = () => {
  let options = {
    startDate: (new Date(2016,10,1)).toISOString(), // required
    endDate: (new Date()).toISOString(), 
  };
  getSleepData(options).then(res => {
    state.counterSleep = JSON.stringify(res);
  });
  return (
      <>
          <Text>Sleep</Text>
      </>
  )
}

const CounterWeight = () => {
  const [ counterWeight, setCounterWeight ] = React.useState("");
    let options = {
      unit: 'kg',
      startDate: new Date(2016, 10, 23).toISOString(),
      };
  getWeight(options).then(res => {
    state.counterWeight = JSON.stringify(res);
  });
  return (
      <>
          <Text>Weight</Text>
      </>
  )
}


const CounterBloodPressure = () => {
  const [ counterBloodPressure, setCounterBloodPressure ] = React.useState("");
    let options = {
      unit: 'mmhg',	// default 'mmhg'
      startDate: new Date(2016, 10, 23).toISOString(),
      endDate: new Date().toISOString(),
      ascending: false,	// optional; default false
    };
  getBloodPressure(options).then(res => {
    state.counterBloodPressure = JSON.stringify(res);
  });
  return (
      <>
          <Text>BloodPressure</Text>
      </>
  )
}

const handleStepsClick = () => {
  alert(state.counterSteps);
}

const handleHeartClick = () => {
  alert(state.counterHeartRate);
}
const handleHeightClick = () => {
  alert(state.counterHeight);
}
const handleWeightClick = () => {
  alert(state.counterWeight);
}
const handleSleepClick = () => {
  alert(state.counterSleep);
}
const handleBloodPressureClick = () => {
  alert(state.counterBloodPressure);
}


const App = () =>{
  state = {
    counterSteps: "",
    counterHeartRate: [],
    counterHeight: "",
    counterWeight: "",
    counterSleep: "",
    counterBloodPressure: "",
  }

  console.log("init");
  ConnectToApp();
  return (
    <NavigationContainer>
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
                title="Press me for Steps"
                onPress={()=> handleStepsClick()}
              />
              <Button
                title="Press me for Heartrate"
                onPress={()=> handleHeartClick()}
              />

              <Button
                title="Press me for BloodPressure"
                onPress={()=> handleBloodPressureClick()}
              />

              <Button
                title="Press me for Weight"
                onPress={()=> handleWeightClick()}
              />

              <Button
                title="Press me for Height"
                onPress={()=> handleHeightClick()}
              />

              <Button
                title="Press me for Sleep"
                onPress={()=> handleSleepClick()}
              />

              <CounterSteps></CounterSteps>
              <CounterHeartRate></CounterHeartRate>
              <CounterHeight></CounterHeight>
              <CounterWeight></CounterWeight>
              <CounterSleep></CounterSleep>
              <CounterBloodPressure></CounterBloodPressure>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
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
