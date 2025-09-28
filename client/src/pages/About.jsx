import { useState } from "react";
import { useAuth } from "../store/auth";

export const About = () => {    
    const {user} = useAuth();

    return (
        <main>
            <section className="section-about">
                <div className="container grid grid-two-cols">
                    <div className="about-content">
                        <p className="about-welcome">Welcome {user ? user.username : "to our Website"}</p>
                        <h1 className="about-heading">Why Choose Us?</h1>
                        <ul className="about-list">
                            <li><b>Expertise:</b> Our team consists of experienced IT professionals who are passionate about staying up-to-date with the latest industry trends.</li>
                            <li><b>Customization:</b> We understand that every business is unique. That's why we create solutions that are tailored to your specific needs and goals.</li>
                            <li><b>Customer-Centric Approach:</b> We prioritize your satisfaction and provide top-notch support to address your IT concerns.</li>
                            <li><b>Affordability:</b> We offer competitive pricing without compromising on the quality of our services.</li>
                            <li><b>Reliability:</b> Count on us to be there when you need us. We're committed to ensuring your IT environment is reliable and available 24/7.</li>
                        </ul>
                        <div className="btn-group">
                            <a href="/contact"><button className="btn btn--primary">Connect Now</button></a>
                            <a href="/service"><button className="btn btn--outline">Learn More</button></a>
                        </div>
                    </div>
                    <div className="about-image">
                        <img src="/images/about.png" alt="About" width="500" height="500" />
                    </div>
                </div>
            </section>
        </main>
    );
};