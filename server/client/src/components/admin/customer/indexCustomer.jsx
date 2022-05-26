import NavbarCustomer from "./navBarCustomer";

function IndexCustomer() {
    return ( 
        <div>
            <NavbarCustomer/>
            <div className="container">
                <div className="row justify-content-center mt-5 pt-5 align-items-center">
                    <div className="col-6 justify-content-center">
                        <h1>Welcome To Customer Dashboard</h1>
                    </div>
                </div>        
            </div> 
        </div>
     );
}

export default IndexCustomer;