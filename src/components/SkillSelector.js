import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import './SkillSelector.css';
import { Container ,Paper,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function SkillSelector() {

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
       
      },
    },
  }));

const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}

const classes = useStyles();

const [skill_list,setSkills]=useState([])

const[employees_list,setEmployees]=useState([])

const [selected_skills,setSelectedSkills]=useState([])


useEffect(()=>{
    fetch("http://localhost:8081/skill/getSkills")
    .then(res=>res.json())
    .then((result)=>{
        setSkills(result);
    }
  )
  },[])

const handleSelected = (e) => {
  setSelectedSkills(Array.isArray(e) ? e.map(x => x.key) : []);
}

const handleClick=(e)=>{
    
    fetch("http://localhost:8081/skill/search/users",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skillId: selected_skills
    }),
  }) 
     .then(resp => resp.json())
     .then((result)=>{
        setEmployees(result);
     })
     .then(data => console.log(data))
     .catch(err => console.log(err))
}



return (
  <div className='filter-container'>
    <Paper elevation={3} style={paperStyle}>  
    <form className={classes.root} noValidate autoComplete="off">
      <Select 
        className="dropdown"
        placeholder="Select Option"
        value={skill_list.find(obj => selected_skills.includes(obj.value))}
        options ={skill_list.map(opt => ({ key: opt.skill_id ,label: opt.skillName, value: opt.skillName}))} 
        onChange={handleSelected}
        isMulti
        isClearable
        
      />   
      <Button className='button-style' variant="contained" color="secondary"  size='medium' onClick={handleClick}> Search </Button>  
      </form>  
      </Paper>   
     
      <h1>Employees with Above Skills</h1>

      <Paper elevation={3} style={paperStyle}>
             {employees_list.map(employee=>(
             <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={employee.userid}>
              Name:{' '+employee.firstName +' ' +employee.lastName}<br/>
              Email:{' ' +employee.username}<br/>
              Experience : {' '+employee.experience}
             </Paper>
             ))}
      </Paper>
  </div>
       );
}

export default SkillSelector