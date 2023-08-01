import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, responsiveFontSizes } from '@mui/material';
import { Box, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from '/Users/consultadd/Desktop/empfrontend/src/contexts/Appcontext.js';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Addform from './Addform';


const Admin = () =>{

    const [teamData, setTeamData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get_all/`)
        .then((response)=>{
            setTeamData(response.data)
        })
        .catch((error) => {
             console.log(error)
        } )
     },[])


     const handleOnClick = (employeeId) => {
        // Navigate to the employee profile page when the box is clicked

        navigate(`/user_profile/${employeeId}`);
      };
    
     const handledelete = (employeeID) => {
    
        axios.delete(`http://127.0.0.1:8000/api/delete_employee/${employeeID}`)
        .then( response => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
          });
      }

      const handleAdd = (formData) => {

        console.log(formData);
        
        axios.post('http://127.0.0.1:8000/api/add_employee/', formData)
          .then((response) => {
            
            window.location.reload();
            console.log('Employee added successfully:', response.data);
           
          })
          .catch((error) => {
           
            console.error('Error adding employee:', error);
          });
      };



     return (
        teamData.length ?
       
        <div>
            {/* <Header /> */}
           
          <h1>Team Details</h1>
         
          <button type="button"  onClick={() => setShowForm(true)} style={{backgroundColor: '#555555', color: 'white'}}>ADD Employee</button> 
          {
            showForm && (
                
                <Addform
                  onClose={() => setShowForm(false)} 
                  onAddEmployee={handleAdd} 
                />
              )
          }
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {teamData.map(employee => (
                <div>
              <Paper
                key={employee.id}
                elevation={1}
                sx={{
                  backgroundColor: 'rgb(240, 240, 240)',
                  m: 10,
                  width: 280,
                  height: 280,
                  cursor: 'pointer', // Add cursor style to show it's clickable
                  '&:hover': {
                    // Add hover effect
                    backgroundColor: 'lightgray',
                  },
                }}
                onClick={() => handleOnClick(employee.id)} 
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ marginTop: '15%', width: '15%', height: '15%' }}
                />
                <Typography marginLeft={1}  margin={3}>Name: {employee.name}</Typography>
                <Typography marginLeft={1} margin={1}>Email: {employee.email}</Typography>
                <Typography marginLeft={1} margin={1}>
                  Contact No.: {employee.contact_number}
                </Typography>   
                 
              </Paper>
               <button type="button"  onClick={() => handledelete(employee.id)} style={{backgroundColor: '#555555', color: 'white'}}>Remove</button> 
               </div>
            )
            )           
            }
            
          </Box>
        </div> 
        :
        <div>
            <h1>He is not managing any team</h1></div>
           
      );
}

export default Admin;