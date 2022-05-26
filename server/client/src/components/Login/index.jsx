import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup =() =>{
    const [data,setData ] = useState({
        email:"",
        password:""
    });
    const [error,setError ] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget:input }) => {
        setData({...data,[input.name]:input.value });
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data:res } = await axios.post(url,data);
            localStorage.setItem("token",res.data);
            localStorage.setItem('username', res.name)
            console.log(res.name)
            localStorage.setItem('address', res.address)
            localStorage.setItem('phone', res.phone)
            localStorage.setItem('id', res.id)
            if(res.code === 200)
                navigate("/admin");
            if(res.code === 201)
                navigate("/dashEmployee");
            if(res.code === 202)
                navigate("/customer");
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
        <div className="container">
            <div className="row mt-5 pt-5 justify-content-center">
                <div className="col-12 col-sm-5 p-4 pt-1" style={main_style}>
                    <form className="" onSubmit={handleSubmit}>
                        <h1>Login to Your Account</h1>
                        <div className='mb-3'>
                            <label for="email" class="form-label">Email address</label>
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
                            Sign In
                        </button>
                        
                    </form>
                    &nbsp;
                   <div>    
                   <Link to="/signup">
                        <button type='button' className="btn btn-secondary">
                            Register
                        </button>
                    </Link>
                   </div>                   
                </div>                               
            </div>
        </div>
    )
};

export default Signup;