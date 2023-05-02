import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './AllFeatures.css';
import { Paper,Box} from '@material-ui/core';

function SearchEmployee() {

const [employee_list,setEmployees]=useState(null); 

const [searched_user, setSelected] = useState("");

const [user,setFoundUser] = useState("");

const [showResults, setShowResults] = useState(false);

const searchBarStyle={width: '550px', maxWidth:'100vh'}

const FormpaperStyle={padding:'50px 20px',width: '600px', maxWidth:'100vh',margin:"20px auto" ,maxHeight: '100vh'}

const ListpaperStyle={padding:'50px 20px',width: '600px', maxWidth:'100vh',margin:"20px auto" ,maxHeight: '100vh',overflow: 'auto'}

useEffect(() => {
    fetch("http://localhost:8081/user/getUsers")
    .then(response => response.json())
    .then(data => setEmployees(data))
     },[])  
 
const showResult=(value)=>{
  value === null ?setShowResults(false) :
  fetch(`http://localhost:8081/user/getUser?userid=${value.userid}`, {
    method: "GET"
   })
   .then(resp => resp.json())
          .then((result)=>{
            setFoundUser(result);
            setShowResults(true);
          })
} 
     
const Results = () => (
  <Paper elevation={3} style={ListpaperStyle}>
    <h3>Employee Details</h3> 
              Name:{' '+user.firstName +' ' +user.lastName}<br/>
              Email:{' ' +user.username}<br/>
              Experience : {' '+user.experience}
  </Paper>
)

  return (

    <div className='filter-container'>
   <Paper elevation={3} style={FormpaperStyle}>  
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(option) => option.username}
      options={employee_list}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.userid}>
          {option.username}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} style={searchBarStyle} id="outlined-basic" variant="outlined"  label="Employee Search" />}
      onChange={(event, value) => showResult(value)}
    />
  </Paper>
    { showResults ? <Results /> : null }
  </div>
    );
  
}
export default SearchEmployee;

