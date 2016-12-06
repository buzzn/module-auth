[ ![Codeship Status for buzzn/module-consumer-form](https://app.codeship.com/projects/867cccd0-99df-0134-8de6-3e4c54ed65a2/status?branch=master)](https://app.codeship.com/projects/187835)
# module-auth

To run local dev server:
- clone this repository
- install node.js 6.xx
- run `sudo npm i -g yarn webpack`
- run `yarn`
- run `yarn run dev-server`

To run tests:
- run `sudo npm i -g mocha`
- run `yarn run test`

How to build automatically on codeship:
- setup commands:
```
nvm install 6.7.0
npm cache clean
npm i -g yarn cross-env rimraf
yarn
npm rebuild node-sass
```
- test pipeline commands:
```
yarn run test
yarn run build
```

To use linter:
- install eslint globally `sudo npm i -g eslint`
- add eslint plugin to your favorite editor

How to use this module in app:
- add it as a dependency in package.json (replace v1.0.2 with required tag):
```
"@buzzn/module_powertaker_form": "git+https://github.com/buzzn/module-powertaker-form.git#v1.0.2"
```
- add Auth reducers to app reducers:
```
import { combineReducers } from 'redux';
import Auth from '@buzzn/module_auth';

export default combineReducers({
  auth: Auth.reducers,
});
```
- run Auth saga in saga middleware:
```
import Auth from '@buzzn/module_auth';
import appSaga from './sagas';

function* rootSaga() {
  yield [call(Auth.sagas), call(appSaga)];
}
// ...
// store configuration
  sagaMiddleware.run(rootSaga);
// ...
```
- listen for Auth.constants.SIGN_IN and Auth.constants.SIGN_OUT actions when needed
- add Auth react components to UI (if needed): Auth.PasswordSignIn, Auth.RefreshButton, Auth.SignOutButton
