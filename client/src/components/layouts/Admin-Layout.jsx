import { FaHome, FaRegListAlt, FaUser } from "react-icons/fa"
import { FaMessage } from "react-icons/fa6"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../store/auth"

export const AdminLayout = () => {

    const {user, isLoading} = useAuth();
    const navigate = useNavigate();

    if(isLoading)
    {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        );
    }

    if(!user.isAdmin)
    {
        return navigate("/");
    }

    return <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li><NavLink to="/admin" end><FaHome /> Home</NavLink></li>
                        <li><NavLink to="/admin/users"><FaUser /> Users</NavLink></li>
                        <li><NavLink to="/admin/contacts"><FaMessage /> Contacts</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet />
    </>
}