import React from 'react';
import Navigation from './src/navigation';

import {Amplify} from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import AuthContextProvider from './src/context/AuthContext.tsx';
import Client from './src/apollo/Client.tsx';

Amplify.configure(amplifyconfig);

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = () => {
  return (
    <AuthContextProvider>
      <Client>
        <Navigation />
      </Client>
    </AuthContextProvider>
  );
};

export default App;
