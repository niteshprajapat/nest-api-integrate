import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext'

const AppProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));  // Parse user back to object
        const storedToken = localStorage.getItem("token");  // Token is already a string

        setUser(storedUser);
        setToken(storedToken);

    }, []);



    return (
        <AuthContext.Provider value={{
            user, setUser,
            token, setToken,
            isLoggedIn, setIsLoggedIn,
        }}>
            {children}

        </AuthContext.Provider>
    )
}

export default AppProvider