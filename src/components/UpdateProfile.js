import React, { useState,useEffect } from 'react';
import './AllFeatures.css';
import { Container ,Paper,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UpdateProfile(props) {
  const navigate = useNavigate();
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
       
      },
    },
  }));

const FormpaperStyle={padding:'50px 20px',width: 600,margin:"20px auto" ,maxHeight: '100vh'}
  
const classes = useStyles();
 
const location  = useLocation();
const[userid,setUserId] = useState("");
const[firstName,setfName] = useState("");
const[lastName,setlName] = useState("");
const[username,setEmail] = useState("");
const[password,setPassword] = useState("");
const[experience,setExp] = useState("");    
const[role,setRole]=useState("");
const [skill_list,setSkills]=useState([]);
const [selected_skills,setSelectedSkills]=useState([]);
const [assignment_list,setAssignments]=useState([])
const [selected_assingnment,setSelectedAssignment]=useState("")



/*Validation logic*/

const [isValid, setValidation] = React.useState(true);
const [alertContent, setAlertContent] = useState('');


const checkTextInputSubmit =(e)=>{

  //Check for the year experience input 
  if (!experience.trim()) {
      setValidation(false);
      setAlertContent("Years of experience is mandotory and should be a number.");
      return;
  }  
  setValidation(true); 
  handleClick();
 
};


const handleSelectedSkill = (e) => {
    setSelectedSkills(Array.isArray(e) ? e.map(x => x.value) : []);
  }

const handleSelectedAsssignment = (e) => {
    setSelectedAssignment(e?.value);
  }

/* API Call for the backend services.*/ 

useEffect(()=>{
    fetch("http://localhost:8081/assignment/getAssignments")
    .then(res=>res.json())
    .then((result)=>{
        setAssignments(result);
    }
  )
  },[])

useEffect(()=>{
    fetch("http://localhost:8081/skill/getSkills")
    .then(res=>res.json())
    .then((result)=>{
        setSkills(result);
    }
  )
  },[])


 useEffect(()=>{
  const userId = location.state.user;
  setUserId(userId);
  const url = new URL('http://localhost:8081/user/getUser');
  url.searchParams.set('userid', userId);
        fetch(url)
        .then(res=>res.json())
        .then((result)=>{
            setfName(result.firstName);
            setlName(result.lastName);
            setEmail(result.username);
            setExp(result.experience);
            setPassword(result.password);
            setRole(result.role);
        }
      )
      },[])  

 /** Update logic */     

 const handleClick=(e)=>{

        const user = {userid,username,password,firstName,lastName,experience, skillId: selected_skills,activeAssignmentId:selected_assingnment}
        
        fetch("http://localhost:8081/user/update",{
          method:"PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      })  .then(resp => resp.json())
          .then((result)=>{
            clearField(e);
          })
         .then(data => console.log(data))
         .catch(err => console.log(err))
    }

const cancelClick=(e)=>{
  navigate('/')
}    

const clearField = () =>{
  setfName("");   
  setlName("");
  setEmail("");
  setPassword("");
  setExp("");
  setSelectedSkills(null);
  setSelectedAssignment(null);
}


return (
  <div className='filter-container'>           
  <Paper elevation={3} style={FormpaperStyle}>  
    <Typography gutterBottom variant="h5" component="div">Update Profile</Typography>
    <form className={classes.root} noValidate autoComplete="off">
    {!isValid ? <Alert severity='error'>{alertContent}</Alert> : <></> }
    <TextField type = "text" id="firstName" label="First Name" variant="filled" fullWidth value={firstName} />
    <TextField type = "text" id="lastName" label="Last Name" variant="filled" fullWidth value={lastName} />
    <TextField type = "text" id="username" label="Email" variant="filled" fullWidth value={username} />  
    <TextField type = "password" id="password"  label="Password" variant="filled" fullWidth value={password} /> 
    <TextField type="number" id="experience" label="Years of Experience" variant="outlined" fullWidth value={experience} onChange={(e)=>{setExp(e.target.value)}} required />  
    <Select 
       className="dropdown"
       placeholder="Select Your Skills"
       value={selected_skills != null ? skill_list.find(obj => selected_skills.includes(obj.value)) : "" }
       options ={skill_list.map(opt => ({ key: opt.skillId ,label: opt.skillName, value: opt.skillId}))} 
       onChange={handleSelectedSkill}
       isMulti
       isClearable 
       isDisabled = {role == "manager"}
    />  
    <Select 
       className="dropdown"
       placeholder="Select Your Active Assignment"
       value={selected_assingnment != null ? assignment_list.find(obj => assignment_list.includes(obj.value)):""}
       options ={assignment_list.map(opt => ({ key: opt.activeAssignmentId ,label: opt.companyName + ' , ' +opt.position, value: opt.activeAssignmentId}))} 
       onChange={handleSelectedAsssignment}
       isClearable 
       isDisabled = {role == "manager"}
    />
    <Button className='button-style' variant="contained" color="primary"  size='medium' onClick={(e)=>{checkTextInputSubmit(e)}} > Update </Button>
    <Button className='button-style' variant="contained" color="inherit"  size='medium' onClick={(e)=>{cancelClick(e)}} > cancel </Button>
    </form>  
  </Paper>      
</div>
       );
}
export default UpdateProfile


