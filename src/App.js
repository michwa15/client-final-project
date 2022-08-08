import React, { useEffect } from "react";
import "./App.css";
import {SignIn} from './components/sign-in/SignIn';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const Data = () => {
    
    useEffect(() => {
      fetch("/prod")
    })

    return (
      <div>{data}</div>
    )
  }

  return (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="api" element={<Data />} />
        </Routes>
    
      // <div>{data ? data : 'not ready...'}</div>
      // <div>
      //   <SignIn />
      // </div>
      
  );
}

export default App;