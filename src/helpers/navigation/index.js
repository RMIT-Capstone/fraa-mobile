export function navigateTo(navigationProp: Object, screenName: string, options?: Object) {
  navigationProp.navigate(screenName, options);
}

export function replaceTo(navigationProp: Object, screenName: string, options: Object) {
  navigationProp.replace(screenName, options);
}

export function resetRoute(navigationProp: Object, screenName: string, params?: Object) {
  navigationProp.reset({
    routes: [{ name: screenName, params }],
  });
}

// push to a new screen
export function pushTo(navigationProp: Object, screenName: string, propParams?: Object) {
  navigationProp.push(screenName, propParams);
}

// go back one screen
export function goBack(navigationProp: Object) {
  navigationProp.goBack();
}

// go to the first screen in the stack
export function goToFirstScreenInStack(navigationProp: Object) {
  navigationProp.popToTop();
}
