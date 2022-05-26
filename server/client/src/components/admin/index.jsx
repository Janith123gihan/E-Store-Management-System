import Navbar from "./navbar";


const Admin =()=>{

    return(
        <div>
            <Navbar/>
            <div className="container">
                <div className="row justify-content-center mt-5 pt-5 align-items-center">
                    <div className="col-6 justify-content-center">
                        <h1>Welcome To Admin Dashboard</h1>
                    </div>
                </div>        
            </div>        
        </div>
    )
   
};

export default Admin;