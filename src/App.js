import React, { useState } from 'react';
import './App.css';

function timeoutPromise(ms = 5000, promise) {
  if (typeof ms === 'number') {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("API Timeout"))
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    })
  }
}
function App() {
  const [number, changeNumber] = useState()
  const [timeout, changeTimeOut] = useState()
  const [result, setResult] = useState()
  const calculate = async () => {
    if (number !== null && number !== undefined) {
      // console.log('ab')
      try {
        const rawResponse = await timeoutPromise(timeout, fetch(`https://gxxph4h9l6.execute-api.us-east-1.amazonaws.com/default/front_end_hiring?input=${number}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
          }
        }))
        const content = await rawResponse.json();
        // console.log(content.result)
        setResult(content.result)
      }
      catch (err) {
        // console.log(err)
        setResult(err.message)
      }
      changeNumber(undefined)
      changeTimeOut(undefined)
    }
  }

  // console.log(number, timeout)
  // console.log('res', result)
  return (
    <div className="App">
      <h3>Note : Delay Value and Number Value must be a number</h3>
      <p>Default delay is 5s if you get the timeout error then you can change the delay from here: <input onChange={(e) => { changeTimeOut(Number(e.target.value) * 1000) }} /></p>
      <input placeholder="Enter a number" onChange={(e) => { changeNumber(e.target.value) }} />
      <button onClick={calculate}>calculate square root</button>
      <h1>Result: {result}</h1>
    </div>
  );
}

export default App;
