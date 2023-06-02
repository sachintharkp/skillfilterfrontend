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
      <div className='hero-btns'>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link={'/register'}
        >
          REGISTER
        </Button>

        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link={'/login'}
        >
          LOGIN
        </Button>
        </div>
    </div>
  );
}

export default HeroSection;