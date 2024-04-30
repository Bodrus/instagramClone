import React from 'react';
import Navigation from './src/navigation';

import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import AuthContextProvider from './src/context/AuthContext.tsx';

Amplify.configure(amplifyconfig);

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = () => {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
