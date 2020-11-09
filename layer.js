import {
  Platform
} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import GoogleFit, {
  Scopes
} from 'react-native-google-fit'

const optionsGooglePermissions = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_LOCATION_READ,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_NUTRITION_READ,
    Scopes.FITNESS_BLOOD_PRESSURE_READ,
    Scopes.FITNESS_BLOOD_GLUCOSE_READ,
    Scopes.FITNESS_OXYGEN_SATURATION_READ,
    Scopes.FITNESS_BODY_TEMPERATURE_READ,
    Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ
  ],
}
const PERMS = AppleHealthKit.Constants.Permissions;

const optionsApplePermissions = {
  permissions: {
    read: [
      'Height',
      'Weight',
      'StepCount',
      'DateOfBirth',
      'BodyMassIndex',
      'ActiveEnergyBurned',
      'HeartRate',
      'DistanceCycling',
      'BloodPressureDiastolic',
      'BloodPressureSystolic'
    ],
  },
};

export const connect = () => {
  switch (Platform.OS) {
    case 'ios':
      AppleHealthKit.initHealthKit(optionsApplePermissions, (err, results) => {
        if (err) {
          console.log('error initializing Healthkit: ', err);
          return;
        }
      });
      break;
    case 'android':
      GoogleFit.checkIsAuthorized().then(() => {
        if (!GoogleFit.isAuthorized) {
          GoogleFit.authorize(optionsGooglePermissions)
            .then(authResult => {
              if (!authResult.success) {
                console.log("AUTH_DENIED", authResult.message);
              }
            })
            .catch((error) => {
              console.log(error + "AUTH_ERROR");
            })
        }
      })
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};

let TodaysDate = new Date();
let fetch2Date = {
  startDate: "2020-10-22T23:15:50.787Z"
};
let options3 = {
  startDate: (new Date(2020, 10, 23)).toISOString(), // required
};

export const getStepCountToday = async (dateOptions, setFunc) => {
  switch (Platform.OS) {
    case 'ios':
    
    let startDate = (new Date(2016, 10, 23)).toISOString(); // required
    let endDate = (new Date(2020, 10, 23)).toISOString(); // required

    let options = {
      startDate,
      endDate,
      ascending: false,
      limit: 10,
      period: 1440,
      unit: "Step(s)",
      includeManuallyAdded: true,
      };
      
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        ret = {}; 
        ret["ios.dailysteps"] = [];
        results.map(x=> {
          var date = x.endDate.split("T");
          ret["ios.dailysteps"].push({"date": date[0], "value": x.value});
        });
        // var date = results.endDate.split("T");
        // ret["ios.dailysteps"].push({"date": date[0], "value": results.value});
        console.log(ret);
        console.log("steps done\n");
        resolve(ret)
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
        resolve(JSON.stringify(results));
      });
      break;
    case 'android':
      
      GoogleFit.onAuthorize(() => {
        console.log('Sucess 5555 authentification')

        const options = {
          startDate: "2017-01-01T00:00:17.971Z", // required
          endDate: new Date().toISOString(), // required
          bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
          bucketInterval: 1, // optional - default 1. 
        }
        const callback = ((error, response) => {
          if (error){
            console.log(error)
          }
          ret = [];
            response.map(x => {ret.push(
              { "bloodPressureSystolicValue":x.value,
                "bloodPressureDiastolicValue" :x.value2,
                "startDate": x.startDate,
                "endDate": x.endDate
              }
              )});
          console.log(ret);
        });
        GoogleFit.getBloodPressureSamples(options, callback);
      });

      // GoogleFit.getHeartRateSamples(optionsHeartRate, callback)
      console.log("Android heartrate");
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};

export const getBloodPressure = async (sDate, eDate, setFunc) => {
  switch (Platform.OS) {
    case 'ios':
      let options = {
        unit: 'mmhg',	// optional; default 'mmhg'
        // startDate: (new Date(2016,4,27)).toISOString(), // required
        // endDate: (new Date()).toISOString(),	// optional; default now
        startDate: sDate,
        endDate: eDate,
        ascending: false,	// optional; default false
        limit:10, // optional; default no limit
      };
      AppleHealthKit.getBloodPressureSamples(options, (err, results) => {
        if (err) {
          return;
        }
        console.log(results)
        return (results);
      });
      break;
    case 'android':
      GoogleFit.onAuthorize(() => {
        const options = {
          // startDate: "2017-01-01T00:00:17.971Z", // required
          // endDate: new Date().toISOString(), // required
          startDate:sDate,
          endDate:eDate,
          bucketUnit: "DAY", 
          bucketInterval: 1,
        }
        
        const callback = ((error, response) => {
          if (error){
            console.log(error)
          }
          ret = [];
            response.map(x => {ret.push(
              { "bloodPressureSystolicValue":x.value,
                "bloodPressureDiastolicValue" :x.value2,
                "startDate": x.startDate,
                "endDate": x.endDate
              }
              )});
          return (ret);
        });
        
        GoogleFit.getBloodPressureSamples(options, callback);
      });
      break;
    default:
      throw new Error('Invalid platform: ' + Platform.OS);
  }
};


// export const getDistanceCycling = async (setFunc) => {
//   switch (Platform.OS) {
//     case 'ios':
//       let options = {};
//       AppleHealthKit.getDistanceCycling(options, (err, results) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         setFunc((JSON.stringify(results)));
//       });

//       break;
//     case 'android':
//       console.log("Android daily steps");
//       break;
//     default:
//       throw new Error('Invalid platform: ' + Platform.OS);
//   }
// };



export const getStepCountToday2 = (dateOptions, setFunc) => 
new Promise((resolve, reject) => {
  switch (Platform.OS) {
    case 'ios':
    let startDate = (new Date(2016, 10, 23)).toISOString(); // required
    let endDate = (new Date(2020, 10, 23)).toISOString(); // required
    let options = {
      startDate,
      endDate,
      ascending: false,
      limit: 10,
      period: 1440,
      unit: "Step(s)",
      includeManuallyAdded: true,
      };
      
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        ret = {}; 
        ret["ios.dailysteps"] = [];
        results.map(x=> {
          var date = x.endDate.split("T");
          ret["ios.dailysteps"].push({"date": date[0], "value": x.value});
        });
        // var date = results.endDate.split("T");
        // ret["ios.dailysteps"].push({"date": date[0], "value": results.value});
        // console.log(ret);
        console.log("steps done\n");
        resolve(ret);
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
});