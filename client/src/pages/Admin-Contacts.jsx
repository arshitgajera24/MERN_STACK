import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {

    const [contacts, setContacts] = useState([]);

    const {authorizationToken, API} = useAuth();

    const getAllContactsData = async () => {
        try {
            const response = await fetch(`${API}/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            })

            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContact = async (id) => {
        const response = await fetch(`${API}/admin/contacts/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken,
            }
        })

        getAllContactsData();
        if(response.ok)
            toast.success("Deleted Successfully");
        else
            toast.error("Deletion Failed");
    }

    useEffect(() => {
        getAllContactsData();
    }, [])

    return <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Contacts Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contacts.map((curContactData, index) => {
                                    return <tr key={index}>
                                        <td>{curContactData.username}</td>
                                        <td>{curContactData.email}</td>
                                        <td>{curContactData.message}</td>
                                        <td><button className="admin-btn admin-btn--delete" onClick={() => deleteContact(curContactData._id)}>Delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
}