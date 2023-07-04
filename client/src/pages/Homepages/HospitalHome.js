import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const HospitalHome = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="container">
                <div className="d-felx flex-column mt-4">
                    <h1>
                        Welcome <i className="text-success">{user?.name}</i>
                    </h1>
                    <h4>To the Hospital Page of Vardaan Blood Bank!</h4>
                    <hr />
                    <p>
                        We are thrilled to have you as a valued partner in our mission to provide life-saving blood products to those in need. As a hospital, your collaboration is instrumental in ensuring that patients receive timely access to the blood they require for their treatment and recovery.
                    </p>
                    <p>
                        At Vardaan, we understand the critical role hospitals play in saving lives, and we are dedicated to supporting you in every possible way. Through our user-friendly web application, we strive to streamline the process of requesting and receiving blood products, making it efficient, transparent, and reliable.
                        Our intuitive interface allows you to access real-time information on blood availability, and access to numerous donars . Our goal is to enable you to make informed decisions and ensure the best possible outcomes for your patients.
                    </p>
                    <p>
                        Vardaan Blood Bank values collaboration and open communication. Our dedicated support team is here to assist you with any questions, concerns, or technical assistance you may need. We prioritize your feedback and suggestions, as they are essential in our ongoing efforts to improve our services and meet the evolving needs of our partner hospitals.
                    </p>


                    <p>
                        By leveraging the power of technology and innovation, we aim to forge a strong and reliable partnership with your hospital. Together, we can enhance patient care, save lives, and make a lasting impact on our community.
                    </p>

                    <p>
                        We extend our heartfelt gratitude for choosing Vardaan Blood Bank as your trusted blood resource provider. Your commitment to patient well-being and your dedication to the highest standards of healthcare make you an invaluable partner in our shared mission.
                    </p>
                    <p>
                        Thank you for joining us on this journey. We look forward to serving you and supporting your hospital in delivering exceptional care to those in need.
                    </p>




                    Warm regards,
                    <br /><br />
                    <h6>The Vardaan Blood Bank Team</h6>


                </div>
            </div>
        </Layout>
    );
};

export default HospitalHome;