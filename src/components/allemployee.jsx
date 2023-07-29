import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [userData, setUserData] = useState(null);

  // Function to handle card click and update the selectedEmployeeID
  const handleCardClick = (employeeID) => {
    setSelectedEmployeeID(employeeID);
  };

  useEffect(() => {
    if (selectedEmployeeID) {
      // Make the API call to fetch user data of the selected employee
      axios.get(`http://api.example.com/api/get_employee/${selectedEmployeeID}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [selectedEmployeeID]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            backgroundColor: 'rgb(240, 240, 240)',
            m: 20,
            width: 680,
            height: 680,
            cursor: 'pointer', // Add cursor pointer to show it's clickable
          },
        }}
      >
        {/* Replace this with your employee data */}
        {employeesData.map(employee => (
          <Paper
            elevation={1}
            key={employee.id} // Assuming you have an "id" field in your employee data
            onClick={() => handleCardClick(employee.id)}
          >
            <FontAwesomeIcon icon={faUser} style={{ marginTop: '70px', width: '20%', height: '20%' }} />
            <Typography marginLeft={-53} marginTop={7} fontSize={25}>
              Profile
            </Typography>
            <Typography marginLeft={-55}>
              Name: {employee.name}
            </Typography>
            <Typography marginLeft={-40} marginTop={-3}>
              Email: {employee.email}
            </Typography>
            {/* Add other user details here */}
          </Paper>
        ))}
      </Box>
    </div>
  );
}
