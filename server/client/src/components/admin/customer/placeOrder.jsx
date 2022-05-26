import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarCustomer from './navBarCustomer';


function PlaceOrder() {

    const [ product, setProduct ] = useState([]);
    const [employee, setEmployee ] =useState([]);
     const [error,setError ] = useState("");
    const [data, setData ] =useState({
        name:"",
        detail:"",
        price:"",
        employeeId:"",
        customerName:localStorage.getItem('username'),
        address:localStorage.getItem('address'),
        phone:localStorage.getItem('phone'),
        orderStatus:"pending"
    });
    const navigate = useNavigate();

     const { id } = useParams();
    const handleInputChange = ({ currentTarget:input }) => {
        setData({...data,[input.name]:input.value });
        console.log(employee)
    };
    useEffect(()=> {
        axios.get(`http://localhost:8080/all/productAndEmployees/${id}`).then((response)=>{
            setEmployee(response.data.existingUsers)
            setProduct(response.data.product)
            setData({...data,
                name:response.data.product.name,
                detail:response.data.product.detail,
                price:response.data.product.price });
        })
    }, [])
    const handleBack =()=>{
        navigate("/allOrders");
    }
    console.log(data)
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const url = "http://localhost:8080/all/order/add";
            const { data:res } = await axios.post(url,data);
   
            alert("Order Added Successfully..");
            navigate("/allOrders")
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
            <NavbarCustomer/>
            <button className="btn btn-success m-3" onClick={handleBack}>Back</button>
            <div className="container">
                <div className="row mt-2">
                    <div className="col">
                    <form className="" onSubmit={handleSubmit}>
                        <div className="">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                className="form-control"
                            />
                            <label className="form-label" >Employee Name</label>
                            <select className="form-select" onChange={handleInputChange} name="employeeId"  >
                                {employee.filter(employee => employee.role === '1')
                                    .map(item => {
                                        return (
                                        <option key={item._id} value={item._id}>{item.firstName}</option>
                                        );
                                    })}
                            </select>
                            <label className="form-label">Price</label>
                            <input
                                type="text"
                                value={data.price}
                                className="form-control"
                            />
                            <button className='btn btn-success' type='submit' style={{marginTop:'15px'}}>
                             Order
                            </button>
                            </div> 
                    </form>                        
                    </div>
                </div>
            </div>
        </div>
     );
}

export default PlaceOrder;