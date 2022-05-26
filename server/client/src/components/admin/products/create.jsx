import React, { Component } from 'react';
import Navbar from '../navbar';
import axios from 'axios';

class Create extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            detail:"",
            price:""
        }
    }

    handleInputChange =(e)=>{
        const {name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value 
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const { name, detail, price } = this.state;

        const data = {
            name:name,
            detail:detail,
            price:price
        }

        console.log(data);

        axios.post("http://localhost:8080/all/product/save",data).then((res)=>{
            if(res.data.success){
                window.location = "/allProducts";
            }
        })
    } 
    render() { 
        return (
            <div>
                <Navbar />
               <div className="container">
                   <h2 style={{marginTop:'15px'}}>Add New Product</h2>
                   <form className='needs-validation' noValidate>
                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Name</label>
                         <input type="text"
                         className='form-control'
                         name='name'
                         placeholder='Enter Product Name'
                         value = {this.state.name}
                         onChange={this.handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Detail</label>
                         <input type="text"
                         className='form-control'
                         name='detail'
                         placeholder='Enter Details'
                         value = {this.state.detail}
                         onChange={this.handleInputChange}/>
                     </div>

                     <div className='form-group' style={{marginBottom:'15px'}}>
                         <label style={{marginBottom:'5px'}}>Price</label>
                         <input type="text"
                         className='form-control'
                         name='price'
                         placeholder='Enter Price'
                         value = {this.state.price}
                         onChange={this.handleInputChange}/>
                     </div>

                     <button className='btn btn-success' type='submit' style={{marginTop:'15px'}} onClick={this.onSubmit}>
                         &nbsp; Add
                     </button>
                 </form>
               </div>
            </div>
        );
    }
}
 
export default Create;