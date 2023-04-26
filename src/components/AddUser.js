import React, { useState,useEffect } from 'react';
import './AllFeatures.css';
import { Container ,Paper,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Select from 'react-select';

function AddUser() {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
           
          },
        },
      }));
    
      const FormpaperStyle={padding:'50px 20px',width: 600,margin:"20px auto" }

      const ListpaperStyle={padding:'50px 20px',width: 'fit-content',margin:"20px auto" ,maxHeight: '100vh',overflow: 'auto'}
      
    const classes = useStyles();
     
  
    const[firstName,setfName] = useState("");
    const[lastName,setlName] = useState("");
    const[username,setEmail] = useState("");
    const[experience,setExp] = useState("");    
    const [skill_list,setSkills]=useState([]);
    const [selected_skills,setSelectedSkills]=useState([]);
    const [assignment_list,setAssignments]=useState([])
    const [selected_assingnment,setSelectedAssignment]=useState("")

    /*Testing purpose items*/     
    const[addedUser,setAddedUser] = useState("");
    const[responseSkill,setSkillResponse] = useState([]);
    const[responseAssignment,setAssignmentResponse] = useState([]);


    /*Validation logic*/

    const [isValid, setValidation] = React.useState(true);
    const [alertContent, setAlertContent] = useState('');

   
    const checkTextInputSubmit =(e)=>{
  
      if (!firstName.trim()) {
        setValidation(false);
        setAlertContent("First name is mandotory.");
        return;
      }
      //Check for the Last name TextInput
      if (!lastName.trim()) {
        setValidation(false);
        setAlertContent("Last name is mandotory.");
        return;
      }
      //Check for the Email seats TextInput
      if (!username.trim()) {
        setValidation(false);
        setAlertContent("Email is mandotory.");
        return;
        }
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
    
   
    const handleClick=(e)=>{

        const user = {username,firstName,lastName,experience, skill: selected_skills,activeAssignment:selected_assingnment}
        
        fetch("http://localhost:8081/user/create",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      })  .then(resp => resp.json())
          .then((result)=>{
            setAddedUser(result);
            setSkillResponse(result.skill);
            setAssignmentResponse(result.activeAssignment);
            clearField(e);
          })
         .then(()=>{console.log("New user added") })
         .then(data => console.log(data))
         .catch(err => console.log(err))
    }

    const cancelClick=(e)=>{
      window.location.reload();
    }    

    const clearField = () =>{
      setfName("");   
      setlName("");
      setEmail("");
      setExp("");
      setSelectedSkills(null);
      setSelectedAssignment(null);
    }
    
    return (
      <div className='filter-container'>           
          <Paper elevation={3} style={FormpaperStyle}>  
            <Typography gutterBottom variant="h5" component="div">Add New User</Typography>
            <form className={classes.root} noValidate autoComplete="off">
            {!isValid ? <Alert severity='error'>{alertContent}</Alert> : <></> }
            <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e)=>{setfName(e.target.value) }} required/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e)=>{setlName(e.target.value)}} required/>
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth value={username} onChange={(e)=>{setEmail(e.target.value) }} required  />  
            <TextField type="number" id="outlined-basic" label="Years of Experience" variant="outlined" fullWidth value={experience} onChange={(e)=>{setExp(e.target.value)}} required />  
            <Select 
               className="dropdown"
               placeholder="Select Your Skills"
               value={selected_skills != null ? skill_list.find(obj => selected_skills.includes(obj.value)) : "" }
               options ={skill_list.map(opt => ({ key: opt.skillId ,label: opt.skillName, value: opt.skillId}))} 
               onChange={handleSelectedSkill}
               isMulti
               isClearable 
            />  
            <Select 
               className="dropdown"
               placeholder="Select Your Active Assignment"
              value={selected_assingnment != null ? assignment_list.find(obj => assignment_list.includes(obj.value)):""}
               options ={assignment_list.map(opt => ({ key: opt.activeAssignmentId ,label: opt.companyName + ' , ' +opt.position, value: opt.activeAssignmentId}))} 
               onChange={handleSelectedAsssignment}
               isClearable 
            />
            <Button className='button-style' variant="contained" color="primary"  size='medium' onClick={(e)=>{checkTextInputSubmit(e)}} > Add </Button>
            <Button className='button-style' variant="contained" color="inherit"  size='medium' onClick={(e)=>{cancelClick(e)}} > cancel </Button>
            </form>  
          </Paper>  
          
          <Paper elevation={3} style={ListpaperStyle}>
          <Typography gutterBottom variant="h5" component="div">Added user</Typography>
                  UserId :{addedUser.userid == null ? " " : " "+addedUser.userid  }<br/> 
                  First Name :{addedUser.firstName == null ? " " : " "+addedUser.firstName  }<br/> 
                  Last Name :{addedUser.lastName == null ? " " : " "+addedUser.lastName  }<br/> 
                  Email :{addedUser.username == null ? " " : " "+addedUser.username  }<br/> 
                  Years of Experience :{addedUser.experience == null ? " " : " "+addedUser.experience  }<br/> 
                  Skills :
                  {!(responseSkill== null)? responseSkill.map((c, i) => (
                     <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={i}>
                     Name:{' '+c.skillName}
                    </Paper>
                  )): ""}
                  <br/>
                  Active Assignment :
                 {!(responseAssignment == null)? responseAssignment.map((c, i) => (
                     <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={i}>
                     companyName:{' '+c.companyName + ' , '}
                     position : {' '+c.position}
                    </Paper>
                  )): ""}
         </Paper>
    </div>
           );
}
export default AddUser