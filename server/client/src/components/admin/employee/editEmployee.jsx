import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from "../navbar";

function EditEmployee() {
    const [data,setEmployee ] = useState({
            firstName:"",
            email:"",
            gender:"",
            address:"",
            phone:""
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const [error,setError ] = useState("");

    const handleInputChange = ({ currentTarget:input }) => {
        setEmployee({...data,[input.name]:input.value });
    };
    useEffect(()=> {
        axios.get(`http://localhost:8080/all/employee/${id}`).then((response)=>{
            setEmployee({
                firstName:response.data.employee.firstName,
                email:response.data.employee.email,
                gender:response.data.employee.gender,
                address:response.data.employee.address,
                phone:response.data.employee.phone
            });
        })
    }, [])
    const  onSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url = `http://localhost:8080/all/employee/update/${id}`;
            const { data:res } = await axios.put(url,data);

            navigate("/allEmployees");
            alert("Employee Updated Successfully..");
            console.log(res.message);
        } catch (error) {
            if(error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    setError(error.response.data.message)
                }
        }
    }

    return ( 
        <div>
            <Navbar/>
            <div className="col-md-8 mt-4 mx-auto">
                 <h1 className='h3 mb-3 font-weight-normal'>Edit Employee</h1>
                 <form className='needs-validation' noValidate>
                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>First Name</label>
                         <input type="text"
                         className='form-control'
                         name='firstName'
                         placeholder='Enter Name'
                         value = {data.firstName}
                         onChange={handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Email</label>
                         <input type="text"
                         className='form-control'
                         name='email'
                         placeholder='Enter Email'
                         value = {data.email}
                         onChange={handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Gender</label>
                         <input type="text"
                         className='form-control'
                         name='gender'
                         placeholder='Enter Gender'
                         value = {data.gender}
                         onChange={handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Address</label>
                         <input type="text"
                         className='form-control'
                         name='address'
                         placeholder='Enter Address'
                         value = {data.address}
                         onChange={handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Mobile No</label>
                         <input type="text"
                         className='form-control'
                         name='phone'
                         placeholder='Enter Mobile'
                         value = {data.phone}
                         onChange={handleInputChange}/>
                     </div>
                     <button className='btn btn-success' type='submit' style={{marginTop:'15px'}} onClick={onSubmit}>
                         &nbsp; Update
                     </button>
                 </form>
             </div>
        </div>
     );
}

export default EditEmployee;