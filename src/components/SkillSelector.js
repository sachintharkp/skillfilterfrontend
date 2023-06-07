import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import './AllFeatures.css';
import { Container ,Paper,Button} from '@material-ui/core';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

function SkillSelector() {

const navigate = useNavigate(); 

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
       
      },
    },
  }));

const FormpaperStyle={padding:'50px 20px',width: 600,margin:"20px auto" ,maxHeight: '100vh'}

const ListpaperStyle={padding:'50px 20px',width: 600,margin:"20px auto" ,maxHeight: '100vh',overflow: 'auto'}

const ViewProfileBtnStyle = {float: "right"}

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

const viewProfileClick =(userid)=>{ 
  navigate('/EmployeeDetailS',{
    state:{
      user : userid,
    },
  });
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

const Results = () => (
  employees_list.length ? 
  <Paper elevation={3} style={ListpaperStyle}>
             {employees_list.map(employee=>(
             <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={employee.userid}>
              Name:{' '+employee.firstName +' ' +employee.lastName}<br/>
              Email:{' ' +employee.username}<br/>
              Experience : {' '+employee.experience} 
              <Button color="primary" style={ViewProfileBtnStyle}  onClick={(e)=>{viewProfileClick(employee.userid)}}>View Profile</Button>
             </Paper>
             ))}
  </Paper> :  <Paper elevation={3} style={ListpaperStyle}>
             <Alert severity= "error">No user available with above skill set.</Alert>
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
      <Results />
  </div>
       );
}

export default SkillSelector