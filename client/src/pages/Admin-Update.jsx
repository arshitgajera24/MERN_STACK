import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {

    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    })

    const params = useParams();
    const navigate = useNavigate();
    const {authorizationToken, API} = useAuth();

    const getSingleUserData = async () => {
        const response = await fetch(`${API}/admin/users/${params.id}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            }
        })
            
        const data = await response.json();        
        setData(data);
    }

    useEffect(() => {
        getSingleUserData();
    },[])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
    
        setData({...data, [name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API}/admin/users/update/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                Authorization: authorizationToken,
            },
            body: JSON.stringify(data),
        })

        if(response.ok)
        {
            toast.success("Updated Successfully");
            navigate("/admin/users");
        }
        else 
        {
            toast.error("Updation Failed");
        }
    }

    return <section>
            <main>
                <div className="section-registration">
                    <div className="container gris grid-two-cols">
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Edit Profile</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" required autoComplete="off" className="contact-input" value={data.username} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" required autoComplete="off" className="contact-input" value={data.email} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="message">Phone</label>
                                    <input type="number" name="phone" id="phone" required autoComplete="off" className="contact-input" value={data.phone} onChange={handleInput} />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
}