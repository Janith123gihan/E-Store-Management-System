import { useState, useEffect } from "react";
import axios from "axios";
import NavbarEmployee from "./NavBarEmployee";

function EmployeeOrders() {
    const[ order, setOrder] = useState([]);
    const[error, setError] = useState([]);
    useEffect(()=> {
        retrieveEmployee();
    }, [])
    const onDelivered = async(id)=>{
        
        console.log(id)
        try {
            const url = `http://localhost:8080/all/order/updateEmp/${id}`;
            var currentObject = order.find(function(e) {
                return e._id == id;
              });
              
            const { order:res } = await axios.put(url,currentObject);
            alert("Order Updated Successfully..");
            retrieveEmployee();
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
    const retrieveEmployee=()=>{
        axios.get("http://localhost:8080/all/myOrders").then((response)=>{
            setOrder(response.data.existingOrder)
        })
    }
    return ( 
        <div>
            <NavbarEmployee/>
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Price</th>
                        <th scope="col">Customer Address</th>
                        <th scope="col">Customer Mobile</th>
                        <th scope="col">Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                    {order.filter(order => order.orderStatus === 'pending' && order.employeeId === localStorage.getItem('id'))
                    .map((order) =>(
                        <tr key="">
                            <th scope="row"></th>
                            <td>{order.name}</td>
                            <td>{order.detail}</td>
                            <td>{order.price}</td>
                            <td>{order.address}</td>
                            <td>{order.phone}</td>
                            <td>
                            <a className="btn btn-success" href="#" onClick={()=>onDelivered(order._id)}>
                                Yes
                            </a>
                            </td>
                        </tr>
                     ))}
                     {order.filter(order => order.orderStatus !== 'pending' && order.employeeId === localStorage.getItem('id'))
                    .map((order) =>(
                        <tr key="">
                            <th scope="row"></th>
                            <td>{order.name}</td>
                            <td>{order.detail}</td>
                            <td>{order.price}</td>
                            <td>{order.address}</td>
                            <td>{order.phone}</td>
                            <td>{order.orderStatus}</td>  
                        </tr>
                     ))}
                    </tbody>
                </table>
                    </div>
                </div>
                    
            </div>
        </div>
     );
}

export default EmployeeOrders;