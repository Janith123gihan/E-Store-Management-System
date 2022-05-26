import { useNavigate, Link } from "react-router-dom";
const NavbarCustomer =()=> {
    const navigate = useNavigate();
    const handleLogout =()=>{
        localStorage.removeItem("token");
        localStorage.clear();
        navigate("/login");
    }
    return(
        <div className="">
            <div className="">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/customer">{localStorage.getItem('username')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allOrders">Place Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orderCustomers">My Orders</Link>
                            </li>
                            <li className="nav-item left">
                            <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default NavbarCustomer;