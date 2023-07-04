import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="container">
                <div className="d-felx flex-column mt-4">
                    <h1>
                        Welcome to the Admin Page of <i className="text-success">{user?.name}</i>
                    </h1>
                    <h4>A Blood Bank!</h4>
                    <hr />
                    <p>

                        We are thrilled to have you here, playing a vital role in managing the life-saving operations of Vardaan. As an admin, you hold the power to make a significant impact by ensuring a seamless experience for both donors and recipients through our innovative web application.
                    </p>
                    <p>
                        At Vardaan, we understand the critical importance of blood donation and its potential to save lives. With your assistance, we can make a difference by efficiently coordinating the collection, storage, and distribution of blood products to those in need. Your dedication and efforts will contribute to creating a stronger and healthier community.
                    </p>
                    <p>
                        As an admin, you play a pivotal role in fostering a culture of transparency and trust. Maintain accurate records, communicate with stakeholders, and ensure that every action taken aligns with our core values of integrity, compassion, and reliability.
                    </p>
                    <p>
                        Vardaan Blood Bank is committed to excellence and innovation. We continuously update our web application to deliver the best user experience possible.We are confident that, with your dedication and expertise, we will continue to provide a lifeline of hope to countless individuals.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default AdminHome;