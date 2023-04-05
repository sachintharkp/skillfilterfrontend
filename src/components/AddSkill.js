import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import './SkillSelector.css';
import { Container ,Paper,Button,Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

function AddSkill() {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
           
          },
        },
      }));
    
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto" ,maxHeight: 1200,overflow: 'auto'}
    
    const classes = useStyles();

    const[skillName,setSkillName] = useState('');
    const[skillDescription,setSkillDesc] = useState('');
    
    const [skill_list,setSkills]=useState([])

    const [btnAddDisabled, setAddBtnDisabled] = useState(true)
    
    
    useEffect(()=>{
        fetch("http://localhost:8081/skill/getSkills")
        .then(res=>res.json())
        .then((result)=>{
            setSkills(result);
        }
      )
      },[])
    
   
    const handleClick=(e)=>{

        e.preventDefault()
        const skillSet = {skillName,skillDescription}
        
        fetch("http://localhost:8081/skill/add",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(skillSet),
      }) .then(()=>{
        console.log("New Skill added")
         })
         .then(data => console.log(data))
         .catch(err => console.log(err))

         window.location.reload()
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
     
    
    return (
      <div className='filter-container'> 
        <Grid container spacing={2}>
         <Grid item xs={6} md={6}  className={classes.grid} container justify="flex-end" alignItems="center" spacing={2}>            
            <Paper elevation={3} style={paperStyle}>  
            <Typography gutterBottom variant="h5" component="div">Add skill</Typography>
            <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth value={skillName} onChange={(e)=>{setSkillName(e.target.value);setAddBtnDisabled(!e.target.value)}} required/>
            <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth value={skillDescription} onChange={(e)=>setSkillDesc(e.target.value)}  />  
            <Button className='button-style' variant="contained" color="secondary"  size='medium' onClick={handleClick} disabled={btnAddDisabled}> Add </Button>  
            </form>  
          </Paper>   
         </Grid>
         <Grid item xs={6} md={6}>
          <Paper elevation={3} style={paperStyle}>
          <Typography gutterBottom variant="h5" component="div">All available skills</Typography>
          <Alert severity="warning">Refresh the page to see if any new skills have been added.!</Alert>
          <List>
                 {skill_list.map(skill=>(
                 <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={skill.skillId}>
                  Name:{' '+skill.skillName}<br/>
                  Description:{' ' +skill.skillDescription}
                </Paper>
                 ))}
          </List>       
          </Paper>
        </Grid>
       </Grid>
    </div>
           );
    }
    
    export default AddSkill
