import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from "../navbar";

function Edit() {
    const [data,setProduct ] = useState({
            name:"",
            detail:"",
            price:""
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const [error,setError ] = useState("");

    const handleInputChange = ({ currentTarget:input }) => {
        setProduct({...data,[input.name]:input.value });
    };
    useEffect(()=> {
        axios.get(`http://localhost:8080/all/product/${id}`).then((response)=>{
            setProduct({
                name:response.data.product.name,
                detail:response.data.product.detail,
                price:response.data.product.price
            });
        })
    }, [])
    const  onSubmit = async(e) =>{
        e.preventDefault();
        try {
            const url = `http://localhost:8080/all/product/update/${id}`;
            const { data:res } = await axios.put(url,data);

            navigate("/allProducts");
            alert("Product Updated Successfully..");
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
                 <h1 className='h3 mb-3 font-weight-normal'>Edit product</h1>
                 <form className='needs-validation' noValidate>
                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Name</label>
                         <input type="text"
                         className='form-control'
                         name='name'
                         placeholder='Enter Name'
                         value = {data.name}
                         onChange={handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Detail</label>
                         <input type="text"
                         className='form-control'
                         name='detail'
                         placeholder='Enter Detail'
                         value = {data.detail}
                         onChange={handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Price</label>
                         <input type="text"
                         className='form-control'
                         name='price'
                         placeholder='Enter Price'
                         value = {data.price}
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

export default Edit;