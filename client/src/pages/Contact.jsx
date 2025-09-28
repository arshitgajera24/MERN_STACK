import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactForm = {
            username: "",
            email: "",
            message:"",
        };

export const Contact = () => {
    
    const [contact, setContact] = useState(defaultContactForm);
    const [userData, setUserData] = useState(true);

        const {user, API} = useAuth();

        if(userData && user)
        {
            setContact({
                username: user.username,
                email: user.email,
                message: "",
            })

            setUserData(false);
        }
    
        const handleInput = (e) => {
            let name = e.target.name;
            let value = e.target.value;
    
            setContact({...contact, [name]:value});
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
                const response = await fetch(`${API}/contact`, {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                })
    
                if(response.ok)
                {
                    const res_data = await response.json();
                    console.log("Contact data:", res_data);
    
                    setContact(defaultContactForm)
                    alert("Message Sent Successfully");
                }
            } catch (error) {
                console.log("Contact Error:", error);
            }
        }
    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container gris grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/support.png" alt="Contact" width="500" height="500" />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Contact Us</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" required autoComplete="off" className="contact-input" value={contact.username} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" required autoComplete="off" className="contact-input" value={contact.email} onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" rows="5" required className="contact-input contact-textarea" value={contact.message} onChange={handleInput}></textarea>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <div className="contact-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.67288858266!2d72.65747171004749!3d21.159440566626397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1758455840729!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    );
};