import {
  Platform
} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import GoogleFit, {
  Scopes
} from 'react-native-google-fit'



let options = {
  permissions: {
    read: [
      'Height',
      'Weight',
      'StepCount',
      'DateOfBirth',
      'BodyMassIndex',
      'ActiveEnergyBurned',
      'HeartRate',
      'DistanceCycling'
    ],
  },
};


let TodaysDate = new Date();
let fetchDate = {
  date: TodaysDate.toISOString()
};

export const getStepCountToday = async (setFunc) => {
  switch (Platform.OS) {
    case 'ios':
      AppleHealthKit.getStepCount(fetchDate, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        setFunc(results.value)
      });
      break;
    case 'android':
      
      const option2s = {
        startDate: "2017-01-01T00:00:17.971Z", // required ISO8601Timestamp
        endDate: new Date().toISOString() // required ISO8601Timestamp
      };
      
      GoogleFit.getDailyStepCountSamples(option2s, (err, res) => {
        if (err) {
          throw err;
        }
      
        console.log("Daily steps >>>", res);
      });
      // GoogleFit.getDailyStepCountSamples(androidOptions)
      //  .then((res) => {
      //      console.log('Daily steps >>> ', res)
      //  })
      //  .catch((err) => {console.warn(err)})
      
      console.log("Android daily steps");
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};
export const getHeartRate = async (sDate, eDate, setFunc) => {
  switch (Platform.OS) {
    case 'ios':
      let options = {
        startDate: sDate.toISOString(), // required
        endDate: eDate.toISOString(), // optional; default now
      };
      AppleHealthKit.getHeartRateSamples(options, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(results);
        setFunc(JSON.stringify(results));
      });
      break;
    case 'android':
      const optionsHeartRate = {
        startDate: "2017-01-01T00:00:17.971Z", // required
        endDate: new Date().toISOString(), // required
        bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1. 
      }
      const callback = ((error, response) => {
        console.log(error, response)
      });
      
      GoogleFit.getHeartRateSamples(optionsHeartRate, callback)
      console.log("Android heartrate");
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};


export const getDistanceCycling = async (setFunc) => {
  switch (Platform.OS) {
    case 'ios':
      let options = {};
      AppleHealthKit.getDistanceCycling(options, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }

        setFunc((JSON.stringify(results)));
      });

      break;
    case 'android':
      console.log("Android daily steps");
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};

const optionsGoogle = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ_WRITE,
    Scopes.FITNESS_BODY_READ_WRITE,
    Scopes.FITNESS_BLOOD_PRESSURE_READ_WRITE,
    Scopes.FITNESS_BLOOD_PRESSURE_READ
  ],
}

export const connect = () => {
  console.log("inside layer")
  switch (Platform.OS) {
    case 'ios':
      console.log("IOS WE IT");
      AppleHealthKit.initHealthKit(options, (err, results) => {
        if (err) {
          console.log('error initializing Healthkit: ', err);
          return;
        }
      });
      break;
    case 'android':
      console.log("Android WE IT");
      GoogleFit.checkIsAuthorized().then(() => {
        console.log(GoogleFit.isAuthorized)
        
        // if (!GoogleFit.isAuthorized) {
        //   GoogleFit.authorize(optionsGoogle)
        //     .then(authResult => {
        //       if (authResult.success) {
        //         console.log("AUTH_SUCCESS");

        //         // getData(start, end, callback)
        //       } else {
        //         console.log("AUTH_DENIED", authResult.message);
        //       }
        //     })
        //     .catch((error) => {
        //       console.log(error + "AUTH_ERROR");
        //     })
        // }
      })
      GoogleFit.onAuthorize();
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};