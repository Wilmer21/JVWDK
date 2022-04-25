import React from "react";
import './App.css';
import Routes from './routes/Routes'
import {BrowserRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline/>
      <Routes/>
    </BrowserRouter>
  );
}

export default App;
