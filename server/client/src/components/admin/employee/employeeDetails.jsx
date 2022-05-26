import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./../navbar";

function EmployeeDetails() {

    const [employee, setEmployee ] =useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:8080/all/employee/${id}`).then((response)=>{
            setEmployee(response.data.employee);
        })
    }, [])
    const handleBack =()=>{
        navigate("/allEmployees");
    }
    const label_style = {
        borderStyle: "solid",
        borderRadius: "15px",
        borderColor: "black"
    }
    return ( 
        <div>
            <Navbar/>
            <button className="btn btn-success m-3" onClick={handleBack}>Back</button>
            <div className="container">
           
                <div className="row mt-2">
                    <div className="col">
                       
                        <div className="">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                value={employee.firstName}
                                className="form-control"
                            />
                            <label className="form-label">Email</label>
                            <input
                                type="text"
                                value={employee.email}
                                className="form-control"
                            />
                            <label className="form-label">Gender</label>
                            <input
                                type="text"
                                value={employee.gender}
                                className="form-control"
                            />
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                value={employee.address}
                                className="form-control"
                            />
                            <label className="form-label">Mobile No</label>
                            <input
                                type="text"
                                value={employee.phone}
                                className="form-control"
                            />
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
     );
}

export default EmployeeDetails;