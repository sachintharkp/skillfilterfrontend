import React from 'react';
import '../HeroSection.css';
import { Button } from '../Button';

export default function Manager() {
  return (
    <div className='hero-container'>
    <h2>Hello!</h2>
    <p>What you want today ? </p>
    <div className='hero-btns'>
      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        link={"/skill"}
      >
       ADD NEW SKILL
      </Button>

      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        link={"/assignment"}
      >
        ADD NEW ASSIGNMENT
      </Button>
      
      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        link={"/employees"}
      >
        View Employee
      </Button>

      <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        link={"/filter"}
      >
        FILTER EMPLOYEE
      </Button>
    </div>
  </div>
  )
}
