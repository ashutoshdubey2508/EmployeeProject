import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import TeamCard from './Teamcard';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '/Users/consultadd/Desktop/empfrontend/src/contexts/Appcontext.js';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Addform from './Addform'

const TeamCardWrapper = () => {
  return <TeamCard/>;
};

export default function UserProfile() {
    const { id } = useParams();

    const {currentUser} = useContext(AppContext)
    // const {currentmanager} = useContext(AppContext)
    const [userData, setUserData] = useState(null);
    const [tempmanager , setTempmanager] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [empid, setEmpid] = useState();
  
   
    
    useEffect(() => {
      const selectedEmployeeID = id;
    
      axios.get(`http://127.0.0.1:8000/api/get_employee/${selectedEmployeeID}`)
        .then(response => {
          setUserData(response.data);
      
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
      
        axios.get(`http://127.0.0.1:8000/api/get_manager/${selectedEmployeeID}`)
        .then(response => {
          setTempmanager(response.data.name);
        })
        .catch(error => {
          console.error('Error manager data:', error);
        });

    }, []);

    const handleUpdate = (formData) => {

        console.log(formData);
        
        axios.put('http://127.0.0.1:8000/api/update_employee/', formData)
          .then((response) => {
            // setFlag(1);
           console.log(response.data);
           setEmpid(response.data.employee_id);
           console.log('Employee added successfully:', response.data.employee_id);
            // window.location.reload();
            // console.log('Employee added successfully:', response.data);
           
          })
          .catch((error) => {
           
            console.error('Error adding employee:', error);
          });
      };

      useEffect(() => {

        const jsonData = {
            "employeeId": empid,
            "description": "Your details are updated, kindly check!!!"            
          };
    
          
          console.log("------------>",empid)
    
          axios.post(`http://localhost:8080/add`,jsonData)
         .then((response) => {
            console.log("added notification")
          })
        .catch((error) => {
         console.log("error");
        })
      },[empid])
 

  return (
    <div >
        <Header />
        {
            <div style={{marginTop: '70px'}}>
            <h1>Employee Information</h1>
            </div>
        }
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            backgroundColor: 'rgb(240, 240, 240)',
            m: 1,
            width: 680,
            height: 850,
          },
        }}
      >
        <Paper elevation={1}>
        <FontAwesomeIcon icon={faUser} style={{ marginTop : '70px' , width: '20%', height: '20%' }}/>
        
         <Typography marginLeft={-53} marginTop={7} fontSize={25}>
          Profile
         </Typography>
         <Typography marginLeft={-55}>
          Name : 
         </Typography>
         <Typography marginLeft={-45} marginTop={-3}>
          {userData?.name}
         </Typography>
         <Typography marginLeft={-55.5}>
          Email :
         </Typography>
         <Typography marginLeft={-38} marginTop={-3}>
         {userData?.email}
         </Typography>
         <Typography marginLeft={-50}>   
         Contact No. :    
         </Typography>
         <Typography marginLeft={-26} marginTop={-3}>
         {userData?.contact_number} 
         </Typography>
         <Typography marginLeft={-50} marginTop={5} fontSize={25}>   
         Personal    
         </Typography>
         <Typography marginLeft={-49.5}>
         Blood_group :
         </Typography>
         <Typography marginLeft={-30} marginTop={-3}>
         {userData?.blood_group}
         </Typography>
         <Typography marginLeft={-48}>
         Father's name :
         </Typography>
         <Typography marginLeft={-28} marginTop={-3}>
         {userData?.Father_name}
         </Typography>
         <Typography marginLeft={-42}>
         Physically challenged :
         </Typography>
         <Typography marginLeft={-15} marginTop={-3}>
          {userData?.physically_challenged}
         </Typography>
         <Typography marginLeft={-54}>
         Religion : 
         </Typography>
         <Typography marginLeft={-37} marginTop={-3}>
          {userData?.Religion}
         </Typography>
         <Typography marginLeft={-54}>
         Address : 
         </Typography>
         <Typography marginLeft={-37} marginTop={-3}>
          {userData?.address} 
         </Typography>
         <Typography marginLeft={35} marginTop={-38} fontSize={25}>
         Education  
         </Typography>
         <Typography marginLeft={33}>      
         Percentage :
         </Typography>
         <Typography marginLeft={52} marginTop={-3}>
          {userData?.percentage} 
         </Typography>
         <Typography marginLeft={34}>
         Passing year :
         </Typography>
         <Typography marginLeft={55} marginTop={-3}>
          {userData?.passing_year} 
         </Typography>
         <Typography marginLeft={40} marginTop={8} fontSize={25}>
         Company Info 
         </Typography>
         <Typography marginLeft={32}>
         Department : 
         </Typography>
         <Typography marginLeft={57} marginTop={-3}>
          {userData?.department} 
         </Typography>
         <Typography marginLeft={32}>
         Designation : 
         </Typography>
         <Typography marginLeft={60} marginTop={-3}>
          {userData?.designation} 
         </Typography>
         <Typography marginLeft={29}>
         Location :
         </Typography>
         <Typography marginLeft={46} marginTop={-3}>
          {userData?.location} 
         </Typography>
         <Typography marginLeft={32}>
         Reporting to :   
         </Typography>
         <Typography marginLeft={47} marginTop={-3}>
          {tempmanager}
         </Typography>
         <Typography marginLeft={25.5} marginTop={0}>
         <Link to ={`/team/${id}`} onClick={TeamCardWrapper}> 
         Team :
         </Link>
         </Typography>
         <button type="button"  onClick={() => setShowForm(true)} style={{backgroundColor: '#555555', color: 'white', marginTop:'60px'}}>Update Employee</button> 
      {
        showForm && (
            
            <Addform
              onClose={() => setShowForm(false)} 
              onAddEmployee={handleUpdate} 
            />
          )
      }
        </Paper>
        
      </Box>
    </div>
  );
}
