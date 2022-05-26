import React, { Component } from "react";
import axios from 'axios';
import Navbar from "../navbar";
import { Link } from "react-router-dom";

export default class Allproducts extends Component{
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
onDelete =(id) =>{
  axios.delete(`http://localhost:8080/all/product/delete/${id}`).then((res)=>{
    alert("Delete Successfully");
    this.retrieveProducts();
  })
}

  render(){
    return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-4 p-3">
                        <Link className ="btn btn-success" to="/create" >Add New Product</Link>
                    </div>
                </div>
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
                            <td>
                            <Link to ={`/product/${products._id}`} style={{textDecoration:'none'}}>
                            {products.name}
                            </Link>
                            </td>
                            <td>{products.detail}</td>
                            <td>{products.price}</td>
                            <td>
                            <Link className="btn btn-warning" to={`/edit/${products._id}`}>
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </Link>
                            &nbsp;
                            <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(products._id)}>
                                <i className="fas fa-trash"></i>&nbsp;Delete
                            </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
  }
}