import React from 'react';
import './App.css';
import Header from './components/header/Header';
import AnimatedBackGround from './animations/AnimatedBackGround'
import Routes from './router/Routes';

function App() {
  return (
    <> 
      <AnimatedBackGround />
      <div className='container mx-auto px-4'>
        <Header/>
        <Routes/>  
      </div> 
    </>
  );
}

export default App;
