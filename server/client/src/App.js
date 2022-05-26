import { Route, Routes, Navigate } from 'react-router-dom';
import Admin from './components/admin';
import Signup from './components/Signup';
import Login from './components/Login';
import Edit from './components/admin/products/edit';
import Allproducts from './components/admin/products/allProducts';
import Create from './components/admin/products/create';
import ProductDetails from './components/admin/products/productDetails';
import AllEmployees from './components/admin/employee/allEmployees';
import CreateEmployee from './components/admin/employee/createEmployee';
import EditEmployee from './components/admin/employee/editEmployee';
import EmployeeDetails from './components/admin/employee/employeeDetails';
import IndexCustomer from './components/admin/customer/indexCustomer';
import AllOrders from './components/admin/customer/allOrders';
import PlaceOrder from './components/admin/customer/placeOrder';
import DashBoardEmployee from './components/admin/employee/dashboardEmp';
import EmployeeOrders from './components/admin/employee/employeeOrders';
import OrderCustomers from './components/admin/customer/ordersCustomer';
import EditPassword from './components/admin/employee/editPassword';

function App() {
  // const user = localStorage.getItem("token")
  return (
    <Routes>
     
      <Route path="/customer" exact element={<IndexCustomer/>}/>
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/login" exact element={<Login/>}/>
      <Route path="/" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/admin" exact element={<Admin/>}/>
      
      <Route path="/allProducts" exact element={<Allproducts/>}/>
      <Route path="/create" exact element={<Create/>}/>
      <Route path="/product/:id"  exact element = {<ProductDetails/>}/> 
      <Route path="/edit/:id"  exact element = {<Edit/>}/> 
      
      <Route path="/allEmployees" exact element={<AllEmployees/>}/>
      <Route path="/createEmployee" exact element={<CreateEmployee/>}/>
      <Route path="/employee/:id"  exact element = {<EmployeeDetails/>}/> 
      <Route path="/editEmployee/:id"  exact element = {<EditEmployee/>}/> 
      <Route path="/dashEmployee" exact element={<DashBoardEmployee/>}/>
      <Route path="/orderEmployee" exact element={<EmployeeOrders/>}/>
      <Route path="/editPassword" exact element={<EditPassword/>}/>

      <Route path="/allOrders" exact element={<AllOrders/>}/>
      <Route path="/placeOrder/:id" exact element={<PlaceOrder/>}/>
      <Route path="/orderCustomers" exact element={<OrderCustomers/>}/>

    </Routes>
  );
}

export default App;
