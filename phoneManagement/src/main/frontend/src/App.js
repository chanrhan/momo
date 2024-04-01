import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  const [user, setUser] = useState('');

  useEffect(()=>{
      axios.get('/api/test/react')
          .then((res)=>{
            setUser(res.data);
          })
  },[]);

  return (
    <div className="App">
        <h4>Server Data</h4>
        <p>{user.id}</p>
        <p>{user.name}</p>
        <p>{user.age}</p>
    </div>
  );
}

export default App;
