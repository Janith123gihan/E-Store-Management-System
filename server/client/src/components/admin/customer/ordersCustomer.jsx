import NavbarCustomer from "./navBarCustomer";
import { useState, useEffect } from "react";
import axios from "axios";

function OrderCustomers() {
    const[ order, setOrder] = useState([]);
   
    const[error, setError] = useState([]);
    useEffect(()=> {
        retrieveEmployee();
    }, [])
    const onCancel = async(id)=>{
        
        console.log(id)
        try {
            const url = `http://localhost:8080/all/order/update/${id}`;
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
            <NavbarCustomer/>
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
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {order.filter(order => order.orderStatus === 'pending' && order.customerName === localStorage.getItem('username'))
                    .map((order, index) =>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{order.name}</td>
                            <td>{order.detail}</td>
                            <td>{order.price}</td>
                            <td>
                            <a className="btn btn-danger" href="#" onClick={()=>onCancel(order._id)}>
                                Cancel Order
                            </a>
                            
                            </td>
                        </tr>
                     ))}
                     {order.filter(order => order.orderStatus !== 'pending' && order.customerName === localStorage.getItem('username') )
                    .map((order, index) =>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{order.name}</td>
                            <td>{order.detail}</td>
                            <td>{order.price}</td>
                            <td>{order.orderStatus}
                            </td>
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

export default OrderCustomers;