import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import NavbarCustomer from './navBarCustomer';

export default class AllOrders extends Component{
constructor(props){
  super(props);

  this.state = {
    products:[]
  };
}

componentDidMount(){
  this.retrieveProducts();
}
   
retrieveProducts(){
  axios.get("http://localhost:8080/all/products").then(res =>{
    if(res.data.success){
      this.setState({
        products:res.data.existingProducts
      });
      console.log(this.state.products) 
    }
  });
}
  render(){
    return(
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
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((products, index) =>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{products.name}</td>
                            <td>{products.detail}</td>
                            <td>{products.price}</td>
                            <td>
                            <Link className="btn btn-secondary" to={`/placeOrder/${products._id}`}>
                             Place Order
                            </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                    </div>
                </div>
                    
            </div>
        </div>
    )
  }
}