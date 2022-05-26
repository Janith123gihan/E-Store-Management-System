
import NavbarEmployee from './NavBarEmployee';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditPassword() {
    const [data , setData ]= useState({
        email:"",
        currentPassword:"",
        password:"",
        confirmPassword:"",
        firstName:"",
        lastName:"",
        role:"0"
    })
    const [error,setError ] = useState("");
    const [pwdError, setPwdError ] = useState("");

    const id = localStorage.getItem('id');

    const navigate = useNavigate();

    const handleInputChange = ({ currentTarget:input }) => {
        setData({...data,[input.name]:input.value });
        
    };
    const handleValueChange =(e)=>{
        if(data.confirmPassword.length>0){
            if(data.password !== data.confirmPassword){
                setPwdError("Wrong Confirm Password")
            }else{
                setPwdError("")
            }
        }
    }
    useEffect(()=> {
        axios.get(`http://localhost:8080/all/CurrentUser/${id}`).then((response)=>{
            setData({
                email:response.data.user.email,
                firstName:response.data.user.firstName,
                lastName:response.data.user.lastName,
                role:response.data.user.role
            });
            console.log(data)
        })
    }, [])
    const  onSubmit = async(e) =>{
        
        e.preventDefault();
    try{
        const url = `http://localhost:8080/all/updatePassword/${id}`;
        const { data:res } = await axios.put(url,data);

        navigate("/orderEmployee");
        alert("Password Updated Successfully..");
        console.log(res.message);
    }catch (error) {
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
            <NavbarEmployee/>
            <div className="col-md-8 mt-4 mx-auto">
                 <h1 className='h3 mb-3 font-weight-normal'>Edit Password</h1>
                 <form className='needs-validation' noValidate>
                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Current Password</label>
                         <input type="password"
                         className='form-control'
                         name='currentPassword'
                         placeholder='Enter Current Password'
                         value = {data.currentPassword}
                         onChange={handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>New Password</label>
                         <input type="password"
                         className='form-control'
                         name='password'
                         placeholder='Enter New Password'
                         value = {data.password}
                         onKeyUp={handleValueChange}
                         onChange={handleInputChange}/>
                     </div>
                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Confirm Password</label>
                         <input type="password"
                         className='form-control'
                         name='confirmPassword'
                         placeholder='Enter Confirm Password'
                         value = {data.confirmPassword}
                         onKeyUp={handleValueChange}
                         onChange={handleInputChange}/>
                     </div>
                     {error && <div className="alert alert-danger">
                            {error}
                            </div>}
                    {pwdError && <div className="alert alert-danger">
                    {pwdError}
                    </div>}
                     <button className='btn btn-success' type='submit' style={{marginTop:'15px'}} onClick={onSubmit}>
                         &nbsp; Update
                     </button>
                 </form>
             </div>
        </div>
     );
}

export default EditPassword;