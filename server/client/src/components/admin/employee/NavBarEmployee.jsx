import { useNavigate, Link } from "react-router-dom";
const NavbarEmployee =()=> {
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
                                <Link className="nav-link" to="/dashEmployee">{localStorage.getItem('username')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orderEmployee">My Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/editPassword">Edit Password</Link>
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

export default NavbarEmployee;