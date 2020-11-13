import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import document from "document";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";
import { vibration } from "haptics";
import { today } from "user-activity";
import { me } from "appbit";

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1});
  hrm.addEventListener("reading", () => {
   hrmData.text = JSON.stringify(hrm.heartRate);
    if (parseInt(JSON.stringify(hrm.heartRate)) >= 100 ) 
    {
      console.log("heart rate more than 100!");
      console.log(hrm.heartRate);
      vibration.start("ring");
                                         }
    
  });
  sensors.push(hrm);
  hrm.start();
} else {
  hrmLabel.style.display = "none";
  hrmData.style.display = "none";
}

/*

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hrmData.text = JSON.stringify({
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    });
    if (parseInt(JSON.stringify(hrm.heartRate)) >= 100 ) 
    {
      console.log("heart rate more than 100!");
      vibration.start("ring");
                                         }
    
  });
  sensors.push(hrm);
  hrm.start();
} else {
  hrmLabel.style.display = "none";
  hrmData.style.display = "none";
}

*/



const stepsLabel = document.getElementById("steps-label");
const stepsData = document.getElementById("steps-data");
/* 
const barLabel = document.getElementById("bar-label");
const barData = document.getElementById("bar-data");
 */
/* const bpsLabel = document.getElementById("bps-label");
const bpsData = document.getElementById("bps-data");

const gyroLabel = document.getElementById("gyro-label");
const gyroData = document.getElementById("gyro-data");
 */
const hrmLabel = document.getElementById("hrm-label");
const hrmData = document.getElementById("hrm-data");

/* const orientationLabel = document.getElementById("orientation-label");
const orientationData = document.getElementById("orientation-data");
 */
const sensors = [];

console.log(today.local.steps);

if (Accelerometer) {
  const accel = new Accelerometer({ frequency: 1 });
  accel.addEventListener("reading", () => {
    accelData.text = JSON.stringify({
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    });
  });
  sensors.push(accel);
  accel.start();
} else {
  accelLabel.style.display = "none";
  accelData.style.display = "none";
}

function refreshSteps() {
  stepsData.text = today.local.steps
}

/*
if (Barometer) {
  const barometer = new Barometer({ frequency: 1 });
  barometer.addEventListener("reading", () => {
    barData.text = JSON.stringify({
      pressure: barometer.pressure ? parseInt(barometer.pressure) : 0
    });
  });
  sensors.push(barometer);
  barometer.start();
} else {
  barLabel.style.display = "none";
  barData.style.display = "none";
}

*/


/*
if (BodyPresenceSensor) {
  const bps = new BodyPresenceSensor();
  bps.addEventListener("reading", () => {
    bpsData.text = JSON.stringify({
      presence: bps.present
    })
  });
  sensors.push(bps);
  bps.start();
} else {
  bpsLabel.style.display = "none";
  bpsData.style.display = "none";
}
*/



/*
if (Gyroscope) {
  const gyro = new Gyroscope({ frequency: 1 });
  gyro.addEventListener("reading", () => {
    gyroData.text = JSON.stringify({
      x: gyro.x ? gyro.x.toFixed(1) : 0,
      y: gyro.y ? gyro.y.toFixed(1) : 0,
      z: gyro.z ? gyro.z.toFixed(1) : 0,
    });
  });
  sensors.push(gyro);
  gyro.start();
} else {
  gyroLabel.style.display = "none";
  gyroData.style.display = "none";
}

*/


/*
if (OrientationSensor) {
  const orientation = new OrientationSensor({ frequency: 60 });
  orientation.addEventListener("reading", () => {
    orientationData.text = JSON.stringify({
      quaternion: orientation.quaternion ? orientation.quaternion.map(n => n.toFixed(1)) : null
    });
  });
  sensors.push(orientation);
  orientation.start();
} else {
  orientationLabel.style.display = "none";
  orientationData.style.display = "none";
}
*/

display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
});

setInterval(refreshSteps,2000);

