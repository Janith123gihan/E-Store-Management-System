import Navbar from './../navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AllEmployees() {

    const[ employee, setEmployee] = useState([]);
    
    const onDelete =(id) =>{
        axios.delete(`http://localhost:8080/all/employee/delete/${id}`).then((res)=>{
          alert("Delete Successfully");
          retrieveEmployee();
        })
      }
    useEffect(()=> {
        retrieveEmployee();
    }, [])

    const retrieveEmployee=()=>{
        axios.get("http://localhost:8080/all/employees").then((response)=>{
            setEmployee(response.data.existingEmployees);
        })
    }

    return ( 
        <div>
           <Navbar/>
           <div className="container">
               <div className="row">
                   <div className="col-4 p-3">
                        <Link className ="btn btn-success" to="/createEmployee" >Add New Employee</Link>
                    </div>
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((employees, index) =>(
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>
                            <Link to ={`/employee/${employees._id}`} style={{textDecoration:'none'}}>
                            {employees.firstName}
                            </Link>
                            </td>
                            <td>{employees.email}</td>
                            <td>{employees.phone}</td>
                            <td>
                            <Link className="btn btn-warning" to={`/editEmployee/${employees._id}`}>
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </Link>
                            &nbsp;
                            <a className="btn btn-danger" href="#" onClick={()=>onDelete(employees._id)}>
                                <i className="fas fa-trash"></i>&nbsp;Delete
                            </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
               </div>
           </div>
        </div>
     );
}

export default AllEmployees;