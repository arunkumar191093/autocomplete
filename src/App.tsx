import React from 'react';
import logo from './logo.svg';
import './App.css';
import Automcomplete from './components/autocomplete';
import { fruits } from './mockdata';

function App() {
  return (
    <div className="App">
      <Automcomplete
        placeholder='Search fruit'
        initialValues={fruits}
      />
    </div>
  );
}

export default App;
