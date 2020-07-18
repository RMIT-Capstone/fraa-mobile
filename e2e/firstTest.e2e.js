describe('init testing', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render home screen', async () => {
    await expect(element(by.id('Home'))).toBeVisible();
  });

  it('should render Test screen and toaster after tap testBtn then toast button', async () => {
    await element(by.id('Home_testBtn')).tap();
    await expect(element(by.id('Test'))).toBeVisible();
    await element(by.id('SharedComponentsTestToastBtn')).tap();
  });

  it('should render Dialog after tap openDialog', async () => {
    await element(by.id('Home_testBtn')).tap();
    await expect(element(by.id('Test'))).toBeVisible();
    await element(by.id('SharedComponentsTestDialogBtn')).tap();
    await expect(element(by.id('dialog'))).toBeVisible();
    await element(by.id('confirm')).tap();
    await expect(element(by.id('Test'))).toBeVisible();
  });

  // it('should render toasts after tap toast button', async () => {
  //   await element(by.id('Home_testBtn')).tap();
  //   await expect(element(by.id('Test'))).toBeVisible();
  //   await element(by.id('SharedComponentsTestToastBtn')).tap();
  //   await expect(element(by.id('ToastTesting'))).toExist();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
