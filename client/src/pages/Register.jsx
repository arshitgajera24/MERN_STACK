import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    const {storeTokenInLS, API} = useAuth()

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({...user, [name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(user);

        try {
            const response = await fetch(`${API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })

            const res_data = await response.json();
            console.log("Res Data:", res_data);

            if(response.ok)
            {
                storeTokenInLS(res_data.token);

                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                })
                toast.success("Registration Successful...");
                navigate("/");
            }
            else
            {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("Error:", error);
        }


    }

    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container gris grid-two-cols">

                        <div className="registration-image">
                            <img src="./images/register.png" alt="Registration" width="500" height="500" />

                        </div>

                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration Form</h1>
                            <br />

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input type="text" name="username" id="username" required autoComplete="off" value={user.username} onChange={handleInput}/>
                                </div>

                                <div>
                                    <label htmlFor="email">email</label>
                                    <input type="text" name="email" id="email" required autoComplete="off" value={user.email} onChange={handleInput}/>
                                </div>

                                <div>
                                    <label htmlFor="phone">phone</label>
                                    <input type="number" name="phone" id="phone" required autoComplete="off" value={user.phone} onChange={handleInput}/>
                                </div>

                                <div>
                                    <label htmlFor="password">password</label>
                                    <input type="password" name="password" id="password" required autoComplete="off" value={user.password} onChange={handleInput}/>
                                </div>

                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Register Now
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
}