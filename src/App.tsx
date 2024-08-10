import * as React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import StoreProvider from './StoreProvider';

function App() {
  return (
    <StoreProvider>
      <Header />
      <Main />
    </StoreProvider>
  );
}

export default App;
