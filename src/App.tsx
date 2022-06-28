import React, {useState}  from 'react';
import Login from './Login/login';
import { AppFrame } from './AppFrame/AppFrame';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <AppFrame />
  );
}

export default App;