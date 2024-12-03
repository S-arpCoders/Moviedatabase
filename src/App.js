
import './App.css';
import { useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import HomePage from './components/HomePage';

function App() {
  return (
      <div>
    <Navbar/>
      <HomePage />
      </div>
  );
}

export default App;
