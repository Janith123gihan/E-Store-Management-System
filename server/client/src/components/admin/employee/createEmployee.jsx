import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';

const CreateEmployee =() =>{
    const [data,setData ] = useState({
        firstName:"",
        lastName:"",
        email:"",
        role:"1",
        password:"",
        gender:"",
        address:"",
        phone:""
    });

    const [error,setError ] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget:input }) => {
        setData({...data,[input.name]:input.value });
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url = "http://localhost:8080/all/employee/add";
            const { data:res } = await axios.post(url,data);
            
            alert("Employee Created Succesful");
            navigate("/allEmployees");
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
    const main_style = {
        borderStyle: "solid",
        borderRadius: "15px",
        borderColor: "black"
    }
    return(
        <div>
            <Navbar/>
            <div className="container">
            <div className="row  pt-2 justify-content-center">
                <div className="col-12 col-sm-6 p-4 pt-1" style={main_style}>
                    <form className="" onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <div className='mb-3'>
                            <label for="firstName" class="form-label">First Name</label>
                            <input
                            type="text"
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="form-control"
                        />
                        </div>
                        
                        <div className='mb-3'>
                            <label for="lastName" class="form-label">Last Name</label>
                            <input
                            type="text"
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className="form-control"
                        />
                        </div>

                        <div className='mb-3'>
                            <label for="email" class="form-label">Email</label>
                            <input
                            type="text"
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="form-control"
                        />
                        
                        </div>
                        <div className='mb-3'>
                            <label for="gender" class="form-label">Gender</label>
                            <input
                                type="text"
                                placeholder='Gender'
                                name='gender'
                                onChange={handleChange}
                                value={data.gender}
                                required
                                className="form-control"
                            />                        
                        </div>
                        <div className='mb-3'>
                            <label for="address" class="form-label">Address</label>
                            <input
                            type="text"
                            placeholder='Address'
                            name='address'
                            onChange={handleChange}
                            value={data.address}
                            required
                            className="form-control"
                        />
                        </div>
                        <div className='mb-3'>
                            <label for="phone" class="form-label">Phone</label>
                            <input
                            type="text"
                            placeholder='Phone'
                            name='phone'
                            onChange={handleChange}
                            value={data.phone}
                            required
                            className="form-control"
                        />
                        </div>
                        <div className='mb-3'>
                            <label for="password" class="form-label">Password</label>
                            <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="form-control"
                        />
                        </div>
                        {error && <div className="alert alert-danger">
                            {error}
                            </div>}
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
};

export default CreateEmployee;