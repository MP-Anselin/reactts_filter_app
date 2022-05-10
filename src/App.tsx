import React from 'react';
import './App.css';
import {HomePage} from "./pages/Home.page";
import {useAppDispatch} from "./context/ReducerState";

const App = () => {
    // useAppDispatch();

  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
