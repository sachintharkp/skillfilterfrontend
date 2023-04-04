import React from 'react';
import '../HeroSection.css';
import { Button } from '../Button';

export default function Employee() {
  return (
    <div className='hero-container'>
    <h2>Hello!</h2>
    <p>What you want today ? </p>
    <div className='hero-btns'>
      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        link={"/profile"}
      >
       View My Details
      </Button>

      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        link={"/UpdateProfile"}
      >
       Update My Profile
      </Button>
     </div>
  </div>
  )
}
