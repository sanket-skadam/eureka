import React from 'react';
import { EurekaProvider } from './contexts/EurekaContext';
import { Layout } from './components/layout/Layout';

export function App() {
  return (
    <EurekaProvider>
      <Layout />
    </EurekaProvider>
  );
}

export default App;
