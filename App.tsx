import React from 'react';
import Navigation from './src/navigation';

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = () => {
  return <Navigation />;
};

export default App;
