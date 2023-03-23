import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import './SkillSelector.css';

function SkillSelector() {

const [skill_list,setSkills]=useState([])

useEffect(()=>{
    fetch("http://localhost:8081/skill/getSkills")
    .then(res=>res.json())
    .then((result)=>{
        setSkills(result);
        console.log(result.skillName);
    }
  )
  },[])


return (
        <div className='filter-page-container'>
        <Select className='filter-container' options ={skill_list.map(opt => ({ label: opt.skillName, value: opt.skillName}))} isMulti/>
        </div>
       );
}

export default SkillSelector;