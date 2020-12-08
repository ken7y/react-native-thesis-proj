describe('All 6 functions should be loaded', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should load Weight', async () => {
    element(by.type('CounterWeight'));
  });
  it('should load Height', async () => {
    element(by.type('CounterHeight'));
  }); 
  it('should load Steps', async () => {
    element(by.type('CounterSteps'));
  });
  it('should load Blood Pressure', async () => {
    element(by.type('CounterBloodPressure'));
  });
  it('should load Heart Rate', async () => {
    element(by.type('CounterHeartRate'));
  });
  it('should loads Sleep', async () => {
    element(by.type('CounterSleep'));
  });

});

// describe('Tap Function should be working', () => {
//   it('should load Button Click', async () => {
//     await element(by.id('NextButton')).tap();
//     element(by.type('ScrollView'));
//   });
// });

// it('should show world screen after tap', async () => {
    // await element(by.id('hello_button')).tap();
    // await expect(element(by.text('Health'))).toBeVisible();
    // await element(by.id('world_button')).tap();
    //   await expect(element(by.text('World!!!'))).toBeVisible();
// });
