import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [ testStr, setTestStr ] = useState('');
  const [ test2Str, setTest2Str ] = useState('');

  function callback(str) {
    setTestStr(str);
  }

  function callback2(str){
    setTest2Str(str);
  }

useEffect(
  () => {
    axios({
        url: '/home',
        method: 'GET'
    }).then((res) => {
        callback(res.data);
    })
  }, []
);

return (
  <div className="App">
      <header className="App-header">
        
          {testStr}
          {test2Str}
      </header>
  </div>
);
}

export default App;
