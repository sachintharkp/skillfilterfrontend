import React, { useState,useEffect } from 'react';
import './AllFeatures.css';
import { Container ,Paper,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Login() {
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
      
      const[username,setEmail] = useState("");
      const[password,setPassword] = useState("");
           
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
        
        setValidation(true); 
        handleClick();
       
      };
  
      const handleClick=(e)=>{
          const user = {username,password}
          
          fetch("http://localhost:8081/login",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(res => {
           if(res.ok){
           setStatus(true);
           }
           else{
           setStatus(false);
           }
           return res.json();
        }).then((result)=>{
            if(result.status != "SUCCESS"|| result.message != null){
              setShowError(true);
              setErrorContent(result.message);
            }else{
              clearField();
              const data = result.userid;
              localStorage.setItem("user_global",data)
              localStorage.setItem("logstatus","logged")
              localStorage.setItem("roletype",result.role)
              navigate('/');        
            }
     
       })  
      }
  
      const cancelClick=(e)=>{
        navigate('/')
      }    
  
      const clearField = () =>{
        setEmail("");
        setPassword("");
      }
  
    return (
      <div className='filter-container'>           
      <Paper elevation={3} style={FormpaperStyle}>  
        <Typography gutterBottom variant="h5" component="div">Login</Typography>
        <form className={classes.root} noValidate autoComplete="off">
        {!isValid ? <Alert severity='error'>{alertContent}</Alert> : <></> }
        <TextField type = "text" id="username" label="Email" variant="outlined" fullWidth value={username} onChange={(e)=>{setEmail(e.target.value) }} required  />  
        <TextField type = "password" id="password"  label="Password" variant="outlined" fullWidth value={password} onChange={(e)=>{setPassword(e.target.value) }} required  />  
        { showError ? <ErrorResponse /> : null }
        <br/>
        <Button className='button-style' variant="contained" color="primary"  size='medium' onClick={(e)=>{checkTextInputSubmit(e)}} > login </Button>
        <Button className='button-style' variant="contained" color="inherit"  size='medium' onClick={(e)=>{cancelClick(e)}} > cancel </Button>
        </form>  
      </Paper>  
      </div>
    );
}
export default Login

