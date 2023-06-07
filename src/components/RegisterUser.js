import React, { useState,useEffect } from 'react';
import './AllFeatures.css';
import { Container ,Paper,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
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
     
    const[firstName,setfName] = useState("");
    const[lastName,setlName] = useState("");
    const[username,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirm_password,setConfirmPassword] = useState("");
    const[experience,setExp] = useState("");    
    const[role,setRole]=useState("");
    const options = [
        { value: 'employee', label: 'Employee' },
        { value: 'manager', label: 'Manager' }
      ]

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
   
    const handleRoleChange = (role) => {
        setRole(role.value);
      };
   
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

      //Check for the password fields empty
      if(!password.trim()){
        setValidation(false);
        setAlertContent("Password is mandotory.");
        return;
      }

      //Check for the password fields empty
      if(!confirm_password.trim()){    
        setValidation(false);
        setAlertContent("Confirm Password is mandotory.");
        return;
      }
      
      //Check for the confirm password and password same
      if(password !== confirm_password){
        setValidation(false);
        setAlertContent("Password and Confirm Password should be same.");
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

    const handleClick=(e)=>{
        const user = {username,password,firstName,lastName,role,experience}
        
        fetch("http://localhost:8081/user/register",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      }).then(res => {
         if(res.ok){
         setShowError(true);
         setErrorContent("Successfully Registered");
         setStatus(true);
         }
         else{
         setStatus(false);
         }
         return res.json();
      }).then((result)=>{
          if(result.message != null){
          setShowError(true);
          setErrorContent(result.message);
          }else{
            navigate('/login');     
          }
   
     })  
    }
    const cancelClick=(e)=>{
      navigate('/')
    }    

  return (
    <div className='filter-container'>           
    <Paper elevation={3} style={FormpaperStyle}>  
      <Typography gutterBottom variant="h5" component="div">Register</Typography>
      <form className={classes.root} noValidate autoComplete="off">
      {!isValid ? <Alert severity='error'>{alertContent}</Alert> : <></> }
      <TextField type = "text" id="firstName" label="First Name" variant="outlined" fullWidth value={firstName} onChange={(e)=>{setfName(e.target.value) }} required/>
      <TextField type = "text" id="lastName" label="Last Name" variant="outlined" fullWidth value={lastName} onChange={(e)=>{setlName(e.target.value)}} required/>
      <TextField type = "text" id="username" label="Email" variant="outlined" fullWidth value={username} onChange={(e)=>{setEmail(e.target.value) }} required  />  
      <TextField type = "password" id="password"  label="Password" variant="outlined" fullWidth value={password} onChange={(e)=>{setPassword(e.target.value) }} required  />  
      <TextField type = "password" id="confirm_password"  label="Confirm Password" variant="outlined" fullWidth value={confirm_password} onChange={(e)=>{setConfirmPassword(e.target.value) }} required  />  
      <Select
        options={options}
        onChange={handleRoleChange} autoFocus={true} 
        label= "Role"
       />
      <TextField type="number" id="experience" label="Years of Experience" variant="outlined" fullWidth value={experience} onChange={(e)=>{setExp(e.target.value)}} required />  
      { showError ? <ErrorResponse /> : null }
      <br/>
      <Button className='button-style' variant="contained" color="primary"  size='medium' onClick={(e)=>{checkTextInputSubmit(e)}} > Add </Button>
      <Button className='button-style' variant="contained" color="inherit"  size='medium' onClick={(e)=>{cancelClick(e)}} > cancel </Button>
      </form>  
    </Paper>  
    </div>
  );
}
export default RegisterUser
