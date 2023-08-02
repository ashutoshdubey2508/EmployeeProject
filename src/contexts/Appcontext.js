import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Signout from "../components/Signout";
import NotificationMsg from "../components/NotificationMsg";
import Header from "../components/Header";


const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [mainUser, setMainUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/getonly_manager/`); 
            
            setMainUser(res.data);
            setCurrentUser(res.data);
            
        } catch(error) {    
            console.error(error);
        }
    }

    if(!Cookies.get("token")) {    
    //    <Signout/>
    }
    const jwtToken = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    useEffect(() => {
        fetchUser(jwtToken);
    }, []);

  return (
    <AppContext.Provider
      value={{ mainUser, setMainUser, currentUser, setCurrentUser }}
    >
      {children}
      {NotificationMsg}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
