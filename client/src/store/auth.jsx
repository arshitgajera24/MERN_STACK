import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;

    const API = import.meta.env.VITE_APP_URI_API;

    const storeTokenInLS = (token) => {
        setToken(token);
        return localStorage.setItem("token", token);
    }

    let isLoggedIn = !!token;

    const logoutUser = () => {
        setToken(null);
        return localStorage.removeItem("token");
    }

    const userAuthentication = async () => {

        if(!token)
        {
            setUser(null)
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API}/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })

            if(response.ok)
            {
                const data = await response.json();
                console.log("User : ", data.userData);
                setUser(data.userData);
                setIsLoading(false);
            }
            else
            {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error Fetching Data");
        }
    }

    const getServices = async () => {
        try {
            const response = await fetch(`${API}/service`, {
                method: "GET",
            })

            if(response.ok)
            {
                const data = await response.json();
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`Services Frontend Error: ${error}`);
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    },[])

    return (<AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user, services, authorizationToken, isLoading, API }}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return authContextValue;
}