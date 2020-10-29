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
  startDate: "2020-10-22T23:15:50.787Z"
};
let options3 = {
  startDate: (new Date(2020, 10, 23)).toISOString(), // required
};

export const getStepCountToday = async (setFunc) => {
  switch (Platform.OS) {
    case 'ios':
      AppleHealthKit.getStepCount(fetchDate, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("steps result\n");
        ret = {}; 
        ret["ios.dailysteps"] = [];
        var date = results.endDate.split("T");
        ret["ios.dailysteps"].push({"date": date[0], "value": results.value});
        console.log(ret);
        console.log("steps done\n");
        setFunc(results.value)
      });
      break;
    case 'android':

      console.log("Android daily steps");

      GoogleFit.onAuthorize(() => {
        console.log('Sucess 5555 authentification')

        const options = {
          startDate: "2020-09-01T00:00:17.971Z", // required ISO8601Timestamp
          endDate: new Date().toISOString(), // required ISO8601Timestamp
          bucketUnit: "SECOND", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
          bucketInterval: 1, // optional - default 1. 
      };
      GoogleFit.getDailyStepCountSamples(options)
          .then((res) => {
              console.log("AndroidCodeNow")
              ret = {};
              res.map(x => {
                console.log(x["source"]); 
                x["steps"].map(y=> {
                  console.log(y);
                if (!ret[x["source"]]) {
                  ret[x["source"]] = []
                }
                  ret[x["source"]].push(y);
                });
              });
              console.log(ret);
              alert(JSON.stringify(res))
          })
          .catch((err) => {
              console.log(err)
          })

      });


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

      // GoogleFit.getHeartRateSamples(optionsHeartRate, callback)
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
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_READ_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_READ_WRITE,
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
      console.log("Android: IN");
      GoogleFit.checkIsAuthorized().then(() => {
        console.log(GoogleFit.isAuthorized + ": googlefit authorized")

        if (!GoogleFit.isAuthorized) {
          GoogleFit.authorize(optionsGoogle)
            .then(authResult => {
              if (authResult.success) {
                console.log("AUTH_SUCCESS");
                console.log(GoogleFit.isAuthorized + ": googlefit authorized");
                
                console.log("doneken420");

                // getData(start, end, callback)
              } else {
                console.log("AUTH_DENIED", authResult.message);
              }
            })
            .catch((error) => {
              console.log(error + "AUTH_ERROR");
            })
        }
      })
      console.log(GoogleFit.isAuthorized + ": googlefit authorized")
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};