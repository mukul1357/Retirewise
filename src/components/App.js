import '../styles/App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from './Home';
import Service from './Service';
import productName from '../images/productName.png'
import productName1 from '../images/productName1.png'
import Schemes from './Schemes';
import Spinner from './Spinner';

function App() {
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);
  const [goals, setGoals] = useState('');
  const [reply, setReply] = useState('');
  const [load, setLoad] = useState(false);
  const [scheme, setScheme] = useState([]);
  const [names, setNames] = useState([]);
  const [keys, setKeys] = useState([]);

  function setBackground(value) {
    const bg = document.getElementById('background');

    bg.style.filter = value;
  }
  
  return (
    <Router>
      {load ? <Spinner/> : undefined}
      <div id='background' className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Header mediaWidth={mediaWidth} user={user} setUser={setUser}/> */}
                <Header mediaWidth={mediaWidth} homePage={true} productName={productName}/>
                <Home />
              </>
            }
          />
          <Route path='/form' element={
            <>
              <Header mediaWidth={mediaWidth} homePage={true} productName={productName}/>
              <Service setGoals={setGoals} setReply={setReply} load={load} setLoad={setLoad} setBackground={setBackground} setScheme={setScheme} setNames={setNames} setKeys={setKeys}/>
            </>
          }/>
          <Route path='/schemes' element={
            <>
              <Header mediaWidth={mediaWidth} homePage={false} productName={productName1}/>
              <Schemes goals={goals} reply={reply} scheme={scheme} names={names} keys={keys}/>
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
