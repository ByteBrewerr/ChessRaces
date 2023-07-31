import React from 'react';
import './App.css';
import AnimatedBackGround from './animations/AnimatedBackGround'
import Main from './pages/Main';

function App() {
  return (
    <> 
      <AnimatedBackGround />
      <div className="container mx-auto px-4">
        <Main/>
      </div>

    </>
  );
}

export default App;
