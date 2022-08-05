import React from "react";
import "./App.css";
import {SignIn} from './components/sign-in/SignIn'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;