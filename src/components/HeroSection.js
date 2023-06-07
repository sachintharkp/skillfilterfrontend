import React from 'react';
import '../App.css';
import './HeroSection.css';
import { Button } from './Button';
import {useState,useEffect} from 'react'

function HeroSection() {
  const[logStatus,setLogStatus] = useState();
  useEffect(()=>{
    setLogStatus(localStorage.getItem("logstatus"))
  });


  return (
    <div className='hero-container'>
      <h1>Welcome</h1>
      <p>What are you waiting for? Get Start Now</p>
      <br/>
      {logStatus !="logged" ? 
      <div className='hero-btns'>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link={'/register'}
        >
          REGISTER
        </Button>
        </div>
        :""}
    </div>
  );
}

export default HeroSection;