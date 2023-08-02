import React, { useEffect, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { AppContext } from "../contexts/Appcontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NotificationMsg = ({ badge }) => {
  const [maparray, setMaparray] = useState([]);
  const [buttonclick, setButtonClick] = useState(false);
  const {currentUser} = useContext(AppContext)
  const navigate = useNavigate();
  
  console.log({currentUser});
  
  useEffect(() => {
    
    axios.get(`http://localhost:8080/get`)
      .then((response) => {
        // console.log(currentUser);
          setMaparray(response.data)
          console.log(maparray)
      })
      .catch(error => {
        console.error('Error manager data:', error);
      });
  }, []);



  const handlerchange = (notificationid) => {
    setButtonClick(notificationid);

    axios.delete(`http://localhost:8080/delete/${notificationid}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredArray = maparray.filter(notification => notification.employeeId === currentUser.user_id);
  

  return (
    <Menu
      open={Boolean(badge)}
      onClose={() => {}}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {/* List of notifications */}
      {/* Replace the dummy notifications with your actual notifications */}

      {badge > 0 && filteredArray.length ? (
        <>
          {filteredArray.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handlerchange(notification.id)}
              style={{
                backgroundColor: notification.id === buttonclick ? "white" : "RGB(240, 233, 223)",
              }}
            >
              {notification.description}
            </MenuItem>
          ))}
        </>
      ) : (
        <MenuItem>No new notifications</MenuItem>
      )}
    </Menu>
  );
}

export default NotificationMsg;
