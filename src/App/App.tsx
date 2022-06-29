import {useState, useEffect}  from 'react';
import Login from '../Login/login';
import { AppFrame } from '../AppFrame/AppFrame';

function App() {
  let [token, setToken] = useState<string|null>();

  useEffect(() => {
    if (!token && localStorage.getItem('vdas_token') !== undefined) {
      token = localStorage.getItem('vdas_token');
      setToken(token);
    }
  }, [token])

  if (!token) {
    return (
        <Login setToken={setToken} />
    )
  }

  return (
    <AppFrame token={token}/>
  );
}

export default App;