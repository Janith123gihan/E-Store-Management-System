import { useNavigate, Link } from "react-router-dom";
const Navbar =()=> {
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
                                <Link className="nav-link" to="/admin">{localStorage.getItem('username')} </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allProducts">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allEmployees">Employees</Link>
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

export default Navbar;