import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';  
import { useState, useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '/Users/consultadd/Desktop/empfrontend/src/contexts/Appcontext.js';
import Modal from '@mui/material/Modal';





function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function SignIn() {

  const [role, setRole] = useState(''); 
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handlerChange = (event) => {
    setRole(1);
    console.log(role)
  };
  const handlerChange2 = (event) => {
    // if(event.target.value == 'emp')
    setRole(0);
    console.log(role)
  };

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password
    };

      if(role==0)
      {
      axios
        .post("http://127.0.0.1:8000/api/login_employee/", userData)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.jwt;
            const jwtToken = response.data['jwt'];
            // Store the token in cookies
            Cookies.set('token', token, { expires: 7 }); // The token will expire in 7 days
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
            navigate("/home");
          }
        })
        .catch((error) => {
          setErrorMessage("Invalid email or password");
          setOpenModal(true);
          console.log("error occurred");
        })
      }
    else {
      axios
        .post("http://127.0.0.1:8000/api/login_admin/", userData)
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.jwt;
            // Store the token in cookies
            Cookies.set('token', token, { expires: 7 }); // The token will expire in 7 days
            navigate('/admin');
          }
        })
        .catch((error) => {
          setErrorMessage("Invalid email or password");
          setOpenModal(true);
          console.log("error occurred");
        });
    }
  };




  return (
      <Container component="main" maxWidth="xs">
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>



          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="role"
          
        >
          <MenuItem value={1} onClick={handlerChange}>Admin</MenuItem>
          <MenuItem value={0} onClick={handlerChange2}>Employee</MenuItem>
          
        </Select>
      </FormControl>
    </Box>


            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              {/* <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

        {errorMessage && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4
            }}
          >
            <Typography variant="h6" component="h2" id="modal-title" gutterBottom>
              Error
            </Typography>
            <Typography id="modal-description" gutterBottom>
              {errorMessage}
            </Typography>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </Box>
        </Modal>
      )}
        
      </Container>
    
  );
}