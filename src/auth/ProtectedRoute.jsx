import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TodoContext from "../context/TodoContext";

function ProtectedRoute(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState();

    const checkUserState = async () => {
        const user = localStorage.getItem("user");
        const userObj = JSON.parse(user);

        const response = await fetch(
            `http://localhost:5000/user?email=${userObj?.email}`,
            { method: "GET" }
          );
        const userData = await response.json();

        if (user === "undefined" || !user || userData.length === 0) {
            localStorage.removeItem("user");
            setIsLoggedIn(false);
            return navigate("/");
          }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserState();
    }, []);
 
  return <>{isLoggedIn ? props.children : null}</>;
}

export default ProtectedRoute;
