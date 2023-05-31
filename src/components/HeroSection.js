import React from 'react';
import '../App.css';
import './HeroSection.css';
import { Button } from './Button';

function HeroSection() {

  return (
    <div className='hero-container'>
      <h1>Welcome</h1>
      <p>What are you waiting for? Get Start Now</p>
      <br/>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link={'/register'}
        >
          REGISTER
        </Button>
    </div>
  );
}

export default HeroSection;