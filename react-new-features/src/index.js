import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import NoteApp from './components/NoteApp';


const App = (props) => {

  // State doesn't have to be an object, it could be a string or number or anything with useState
  // use state returns an array of two values the state that will change over time and a function
  // we can call to update the state
  // commonly this array is just destructured into its first and second position, first being the state
  // second being the function
  const [count, setCount] = useState(props.count);
  // can have multiple stat variables going at the same time like this
  const [text, setText] = useState('');

  const increment = () => {
    setCount(count + 1);
  }

  // use effect is called and passed a function. This acts like a combination of component 
  // did mount and component did update. This function runs after the component is created.
  // it will run once right away, and after any changes to component state or props, like
  // lifecycle methods. 
  // use effect lets you specify what things actually cause useEffect to run, specifiec in 
  // a second argument with an array of variables. useEffect will run whenever variables in that
  // array change.
  useEffect(() => {
    // Updating application title that shows up in browser tab
    document.title = 'using app #' + count;
  }, [count])

  // Can have mulitple uses of useEffect nice for running different things based on 
  // different variables changing or different mounting actions
  useEffect(() => {
    // only runs once if an empty dependency list is provided. 
  }, [])

  return (
    <div>
      <p>The current {text || 'count'} is {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>Reset</button>
      <input value={text} onChange={(e) => setText(e.target.value)}/>
    </div>
  )
}

App.defaultProps = {
  count: 0
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      my new content
      <App count={3}></App>
      <p>___________________________________________________</p>
      <NoteApp></NoteApp>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
