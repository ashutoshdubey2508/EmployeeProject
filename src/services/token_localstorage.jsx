import React , {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TokenLocalStorage = () => {

    let navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( () => {
       
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(user && token ){
            setIsLoggedIn(true);

            const logoutTimer = setTimeout(handlelogout , 60*60*1000);

            return () => clearTimeout(logoutTimer);

        }

    }, []);
    
    const handlelogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        return (
            navigate("/")
        );
    };

    
};


export default TokenLocalStorage;