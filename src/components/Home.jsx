import React from "react";
import Header from './Header'
import Profile from "./profile";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    if (Cookies.get("token")) {
        return (
            <div>
                <Header />
                <Profile />
            </div>
        );
    } else {
       
        <h1>Please sign in..</h1>
        // navigate("/");
       
        // return null;
    }
}

export default Home;
