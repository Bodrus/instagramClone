import React from 'react';
import Navigation from './src/navigation';

import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = () => {
  return <Navigation />;
};

export default App;
