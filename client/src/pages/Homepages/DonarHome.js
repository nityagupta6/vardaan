import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const DonarHome = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="container">
                <div className="d-felx flex-column mt-4">
                    <h1>
                        Welcome <i className="text-success">{user?.name}</i>
                    </h1>
                    <h4>To the Donor Page of the Vardaan Blood Bank!</h4>
                    <hr />
                    <p>
                        We are delighted to have you here, ready to make a life-saving difference in our community. By joining us as a donor, you are taking a vital step towards providing hope and support to those in need.
                    </p>
                    <p>
                        At Vardaan, we understand the immense value of your generosity and compassion. Through our intuitive web application, we aim to make the blood donation process seamless, convenient, and rewarding for you. Your contribution will directly impact the lives of individuals facing medical emergencies and create a positive ripple effect within our community.
                    </p>

                    <p>
                        Within this donor portal, you will find a range of features designed to enhance your experience and ensure that your journey as a donor is both fulfilling and effortless. Whether you are a new donor or a returning champion, this platform offers you the tools to manage your profile, schedule donations, and stay connected with our blood bank.
                    </p>

                    <p>
                        Our user-friendly interface provides you with a clear overview of your donation history, enabling you to track your impact and view the lives you have touched through your selfless act.As a donor, you play a crucial role in saving lives, and your commitment is deeply appreciated. By maintaining accurate and up-to-date information in your donor profile, you allow us to provide timely assistance to those in need. We value your trust, and our team ensures the highest level of confidentiality and privacy in handling your personal information.
                    </p>

                    <p>
                        Vardaan Blood Bank is committed to excellence, innovation, and continuous improvement. Your feedback and suggestions are invaluable to us, as we strive to enhance our services and provide the best possible experience for our donors. We encourage you to share your thoughts, ask questions, and engage with our team to help us better serve you and the community.
                    </p>
                    Thank you for being a part of the Vardaan family !!
                    <br />
                    Warm regards,
                    <br /><br />
                    <h6>The Vardaan Blood Bank Team</h6>



                </div>
            </div>
        </Layout>
    );
};

export default DonarHome;