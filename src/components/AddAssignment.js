import React, { useState,useEffect } from 'react';
import './AllFeatures.css';
import { Container ,Paper,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

function AddAssignment() {
     const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
           
          },
        },
      }));
    
      const FormpaperStyle={padding:'50px 20px',width: 600,margin:"20px auto" ,maxHeight: '100vh',overflow: 'auto'}

      const ListpaperStyle={padding:'50px 20px',width: 'fit-content',margin:"20px auto" ,maxHeight: '100vh',overflow: 'auto'}
      
    const classes = useStyles();

    const[companyName,setCompany] = useState("");
    const[position,setPosition] = useState("");
    const[noSeats,setSeats] = useState("");    
    const [assignment_list,setAssignments]=useState([]);

    const [isValid, setValidation] = React.useState(true);
    const [alertContent, setAlertContent] = useState('');
    
    const checkTextInput =(e)=>{

      //Check for the Company Name TextInput
      if (!companyName.trim()) {
        setValidation(false);
        setAlertContent("Company name is mandotory.");
        return;
      }
      //Check for the Position TextInput
      if (!position.trim()) {
        setValidation(false);
        setAlertContent("Position is mandotory.");
        return;
      }
      //Check for the Available seats TextInput
      if (!noSeats.trim()) {
        setValidation(false);
        setAlertContent("Number of seats is mandotory.");
        return;
        }

        handleClick();
     
    };

    useEffect(()=>{
        fetch("http://localhost:8081/assignment/getAssignments")
        .then(res=>res.json())
        .then((result)=>{
            setAssignments(result);
        }
      )
      },[])
    
   
    const handleClick=(e)=>{

        const assignmentSet = {companyName,position,noSeats}
        
        fetch("http://localhost:8081/assignment/add",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(assignmentSet),
      }) .then(()=>{
        console.log("New Assignmnet added")
         })
         .then(data => console.log(data))
         .catch(err => console.log(err))

         window.location.reload()
    }
    
    return (
      <div className='filter-container'> 
        <Grid container spacing={2}>
         <Grid item xs={6} md={6}  className={classes.grid} container justify="flex-end" alignItems="center" spacing={2}>            
          <Paper elevation={3} style={FormpaperStyle}>  
            <Typography gutterBottom variant="h5" component="div">Add Assignment</Typography>
            <form className={classes.root} noValidate autoComplete="off">
            {!isValid ? <Alert severity='error'>{alertContent}</Alert> : <></> }
            <TextField  type = "text" id="outlined-basic" label="Company" variant="outlined" fullWidth value={companyName} onChange={(e)=>{setCompany(e.target.value)}} required/>
            <TextField type = "text"  id="outlined-basic" label="Position" variant="outlined" fullWidth value={position} onChange={(e)=>{setPosition(e.target.value)}} required  />  
            <TextField type="number" id="outlined-basic" label="Available Seats" variant="outlined" fullWidth value={noSeats} onChange={(e)=>{setSeats(e.target.value)}} required />  
            <Button className='button-style' variant="contained" color="secondary"  size='medium' onClick={(e)=>{checkTextInput(e)}} > Add </Button>  
            </form>  
          </Paper>   
         </Grid>
         <Grid item xs={6} md={6}>
          <Paper elevation={3} style={ListpaperStyle}>
          <Typography gutterBottom variant="h5" component="div">All available assignments</Typography>
          <Alert severity="warning">Refresh the page to see if any new assignments have been added.!</Alert>
          <List>
                 {assignment_list.map(assignment=>(
                 <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={assignment.activeAssignmentId}>
                  Company Name :{' '+assignment.companyName}<br/>
                  Position :{' ' +assignment.position}<br/>
                  Avialable Seats : {' '+assignment.noSeats}
                </Paper>
                 ))}
          </List>       
          </Paper>
        </Grid>
       </Grid>
    </div>
           );
}
export default AddAssignment