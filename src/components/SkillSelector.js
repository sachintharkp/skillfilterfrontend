import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import './AllFeatures.css';
import { Container ,Paper,Button} from '@material-ui/core';
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

const FormpaperStyle={padding:'50px 20px',width: 600,margin:"20px auto" ,maxHeight: '100vh'}

const ListpaperStyle={padding:'50px 20px',width: 'fit-content',margin:"20px auto" ,maxHeight: '100vh',overflow: 'auto'}

const classes = useStyles();

const [skill_list,setSkills]=useState([])

const[employees_list,setEmployees]=useState([])

const [selected_skills,setSelectedSkills]=useState([])

const [showResults, setShowResults] = React.useState(false)


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
        setShowResults(true);
     })
     .then(data => console.log(data))
     .catch(err => console.log(err))
}

const Results = () => (
  <Paper elevation={3} style={ListpaperStyle}>
    <h3>Employees with Above Skills</h3>
             {employees_list.map(employee=>(
             <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={employee.userid}>
              Name:{' '+employee.firstName +' ' +employee.lastName}<br/>
              Email:{' ' +employee.username}<br/>
              Experience : {' '+employee.experience}
             </Paper>
             ))}
  </Paper>
)

return (
  <div className='filter-container'>
    <Paper elevation={3} style={FormpaperStyle}>  
    <form className={classes.root} noValidate autoComplete="off">
      <Select 
        className="dropdown"
        placeholder="Select Option"
        value={skill_list.find(obj => selected_skills.includes(obj.value))}
        options ={skill_list.map(opt => ({ key: opt.skillId ,label: opt.skillName, value: opt.skillName}))} 
        onChange={handleSelected}
        isMulti
        isClearable
        
      />   
      <Button className='button-style' variant="contained" color="primary"  size='medium' onClick={handleClick}> Search </Button>  
      </form>  
      </Paper>   
      { showResults ? <Results /> : null }
  </div>
       );
}

export default SkillSelector