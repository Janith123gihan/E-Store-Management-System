import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./../navbar";

function PostDetails() {

    const [product, setProduct ] =useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:8080/all/product/${id}`).then((response)=>{
            setProduct(response.data.product);
        })
    }, [])
    const handleBack =()=>{
        navigate("/allProducts");
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
                                value={product.name}
                                className="form-control"
                            />
                            <label className="form-label">Detail</label>
                            <input
                                type="text"
                                value={product.detail}
                                className="form-control"
                            />
                            <label className="form-label">Price</label>
                            <input
                                type="text"
                                value={product.price}
                                className="form-control"
                            />
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
     );
}

export default PostDetails;