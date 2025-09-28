import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth"

export const Navbar = () => {
    
    const { isLoggedIn } = useAuth();

    return <>
        <header>
            <div className="container">
                <div className="logo-brand">
                    <NavLink to="/">MERN</NavLink>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/">HOME</NavLink></li>
                        <li><NavLink to="/about">ABOUT</NavLink></li>
                        <li><NavLink to="/service">SERVICE</NavLink></li>
                        <li><NavLink to="/contact">CONTACT</NavLink></li>
                        { isLoggedIn 
                        ? <li><NavLink to="/logout">LOGOUT</NavLink></li>
                        : <><li><NavLink to="/register">REGISTER</NavLink></li>
                            <li><NavLink to="/login">LOGIN</NavLink></li></>
                        }
                        
                        
                    </ul>
                </nav>
            </div>
        </header>
    </>
}