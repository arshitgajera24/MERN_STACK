import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {

    const {logoutUser} = useAuth();

    useEffect(() => {
        logoutUser();
    }, [logoutUser])

    const navigate = useNavigate();

    return navigate("/login");
}