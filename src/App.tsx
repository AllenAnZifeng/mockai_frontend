import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'


function App() {
  return (
      <div className="App">
          <div className="leftPanel">
              <div className='tldrawContainer'>
                 <Tldraw/>
              </div>
            <div className='drawbutton'>
                Submit
            </div>
          </div>
          <div className="rightPanel">
                <div className='chatContainer'>
                    {/*// chat*/}
                </div>
                <div className='chatbutton'>
                    Send
                </div>
          </div>
      </div>
  );
}

export default App;
