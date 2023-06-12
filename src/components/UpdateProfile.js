import React, { useState,useEffect } from 'react';
import './AllFeatures.css';
import { Container ,Paper,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Select from 'react-select';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const navigate = useNavigate();
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
       
      },
    },
  }));

const FormpaperStyle={padding:'50px 20px',width: 600,margin:"20px auto" ,maxHeight: '100vh'}

const GridStyle = { margin: '10px auto' ,}
 
const classes = useStyles();
 
const[userid,setUserId] = useState("");
const[firstName,setfName] = useState("");
const[lastName,setlName] = useState("");
const[username,setEmail] = useState("");
const[password,setPassword] = useState("");
const[experience,setExp] = useState("");
const [skill_list,setSkills]=useState([]);
const [selected_skills,setSelectedSkills]=useState([]);
const [assignment_list,setAssignments]=useState([])
const [selected_assingnment,setSelectedAssignment]=useState("")
const [assignmentstatus,setAssignmentStatus]=useState("");
const [saved_selected_skills,setSavedSelectedSkills]=useState([]);
const [saved_assignments,setSavedAssignments]=useState([]);
const [saved_active_assignments,setSavedActiveAssignments]=useState([]);
const[isActiveAssignment,setIsActiveAssignment] = useState(false);


 /**
     * Error Handling
 */  

 const [showError, setShowError] = React.useState(false)
 const [errorContent, setErrorContent] = useState('');
 const[success,setStatus] = React.useState();
 
 const ErrorResponse = () => (
     <Alert severity = {success ? "success":"error"}>{errorContent}</Alert>
   )

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

  useEffect(() => {
  const userId = localStorage.getItem("user_global");
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
            result.skill.map(skills => {
              const exitSlill = {
                key: skills.skillId,
                label: skills.skillName,
                value: skills.skillId
              }     
              saved_selected_skills.push(exitSlill) ;
            }) 
            if((result.activeAssignment).length >0){
              setAssignmentStatus("Assigned");
              result.activeAssignment.map(assignments =>{              
                if(assignments.status){
                  saved_active_assignments.push(assignments);
                  setIsActiveAssignment(true);    
                }
                else{
                  saved_assignments.push(assignments);     
                }
              })
            }
            else{
              setAssignmentStatus("No");
            } 
          }
      )
  }, []);

 /** Update logic */     

 const handleClick=(e)=>{

        const user = {userid,username,password,firstName,lastName,experience, skillId: selected_skills,activeAssignmentId:selected_assingnment,assignmentstatus}     
        fetch("http://localhost:8081/user/update",{
          method:"PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      }).then(res => {
        if(res.ok){
        setShowError(true);
        setErrorContent("Successfully updated");
        setStatus(true);
        }
        else{
        setStatus(false);
        }
        return res.json();
     })
         .then((result)=>{
          if(result.message != null){
            setShowError(true);
            setErrorContent(result.message);
            }
          })
         .then(data => console.log(data))
         .catch(err => console.log(err))
    }

const cancelClick=(e)=>{
  navigate('/')
}    

/*Assignment details logic*/

const handleSelectedAsssignment = (e) => {
  setSelectedAssignment(e?.value);
  }

const handleAssignmentStatus=(e) =>{
  setAssignmentStatus(e.target.value);
}  

/*Assignment history*/ 
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
    
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
      console.log(saved_active_assignments);
    };
  
    const handleClose = () => {
      setOpen(false);
      window.location.reload()
    };

return (
  <div className='filter-container'>           
  <Paper elevation={3} style={FormpaperStyle}>  
    <Typography gutterBottom variant="h5" component="div">Update Profile</Typography>
    <form className={classes.root} noValidate autoComplete="off">
    {!isValid ? <Alert severity='error'>{alertContent}</Alert> : <></> }
    <Grid container spacing={1} style={GridStyle}>
      <Grid item xs={6}> 
      <TextField type = "text" id="firstName" label="First Name" variant="filled" fullWidth value={firstName} />
      </Grid>
      <Grid item xs={6}>
      <TextField type = "text" id="lastName" label="Last Name" variant="filled" fullWidth value={lastName} />
      </Grid>
   </Grid>
   <Grid container spacing={1}style={GridStyle}>
      <Grid item xs={6} md={6}> 
      <TextField type = "text" id="username" label="Email" variant="filled" fullWidth value={username} />  
      </Grid>
      <Grid item xs={6} md={6}>
      <TextField type = "password" id="password"  label="Password" variant="filled" fullWidth value={password} /> 
      </Grid>
   </Grid>
   <Grid container spacing={1} style={GridStyle}>
    <Grid item xs={12}>
    <TextField type="number" id="experience" label="Years of Experience" variant="outlined" fullWidth value={experience} onChange={(e)=>{setExp(e.target.value)}} required />  
    </Grid>
    </Grid>   
    <Grid container spacing={1} style={GridStyle}>
    <Grid item xs={12}>
    <Select 
       className="dropdown"
       placeholder="Select Your Skills"
       value={selected_skills != null ? skill_list.find(obj => selected_skills.includes(obj.value)) : [] }
       options ={skill_list.map(opt => ({ key: opt.skillId ,label: opt.skillName, value: opt.skillId}))} 
       onChange={handleSelectedSkill}
       defaultValue={saved_selected_skills != null ? saved_selected_skills :[]}
       isMulti
       isClearable/>  
    </Grid>
    </Grid>
    <Grid container spacing={1} style={GridStyle}> 
    <Grid item xs={12}>
    <FormControl>
      <FormLabel >Assignment Status</FormLabel>
      <Grid container spacing={1} style={GridStyle}> 
      <RadioGroup
        name="assignment"
        onChange={handleAssignmentStatus}
        value={assignmentstatus}
        row
      >       
      <FormControlLabel value="New" control={<Radio/>} label="New" />    
      <FormControlLabel value="Assigned" control={<Radio/>} label="Assigned" />  
      <FormControlLabel value="No" control={<Radio/>} label="No" /> 
      </RadioGroup>
      </Grid>
    </FormControl>
    </Grid>
   </Grid>
   <Grid container spacing={1} style={GridStyle}> 
    <Grid item xs={9}>
      <Select 
       className="dropdown"
       placeholder="Select Your New Active Assignment"
       value={selected_assingnment != null ? assignment_list.find(obj => assignment_list.includes(obj.value)):""}
       options ={assignment_list.map(opt => ({ key: opt.activeAssignmentId ,label: opt.companyName + ' , ' +opt.position, value: opt.activeAssignmentId}))} 
       onChange={handleSelectedAsssignment}
       isClearable 
       isDisabled = {assignmentstatus == "No" || assignmentstatus == "Assigned"}
    />
    </Grid>
      <Grid item xs={3}>
      <Button color="primary"  onClick={handleClickOpen}>View Hitory</Button>
      </Grid>
   </Grid>
    { showError ? <ErrorResponse /> : null }
    <br/>
    <Button className='button-style' variant="contained" color="primary"  size='medium' onClick={(e)=>{checkTextInputSubmit(e)}} > Update </Button>
    <Button className='button-style' variant="contained" color="inherit"  size='medium' onClick={(e)=>{cancelClick(e)}} > cancel </Button>
    </form>  
  </Paper>    
  <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
            <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Assignment History
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {isActiveAssignment ? 
          saved_active_assignments.map(a=>(
          <ListItem key={a.uniqueAssignmentId}>  
            <ListItemIcon>
            <StarIcon />
            </ListItemIcon>
            <ListItemText primary={a.position} secondary={a.companyName} />
          </ListItem>
          ) ):""}         
          {saved_assignments.map(a=>(
             <ListItem key={a.uniqueAssignmentId}> 
              <ListItemText primary= {a.position} secondary={a.companyName} /> 
            </ListItem>
         ))}
        </List>
      </Dialog>
</div>
       );
}
export default UpdateProfile


