import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useSelector } from "react-redux";
import moment from "moment";

const Hospitals = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    //find donar records
    const getDonars = async () => {
        try {
            if (user?.role === "admin") {
                const { data } = await API.get("/inventory/get-hospitals");
                //   console.log(data);
                if (data?.success) {
                    setData(data?.hospitals);
                }
            }
            if (user?.role === "donar") {
                const { data } = await API.get("/inventory/get-hospitals-for-donar");
                //   console.log(data);
                if (data?.success) {
                    setData(data?.hospitals);
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDonars();
    }, [user]);

    return (
        <Layout>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((record) => (
                        <tr key={record._id}>
                            <td>{record.hospitalName}</td>
                            <td>{record.email}</td>
                            <td>{record.phone}</td>
                            <td>{record.address}</td>
                            <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default Hospitals;