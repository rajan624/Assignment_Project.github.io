// import { Dashboard } from '@material-ui/icons';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Pooling from './Component/Pooling';
import Login from './Component/Login';
import Homepage from './Component/Homepage';
import Cart from './Component/Cart';
import AddProduct from './Component/AddProduct';
import Main from './Component/Main';
function Outlet() {
  return (
    <div className='App'>

      <Router>
      <Routes>
          <Route exact path="/"  element={<Main/>}>
          </Route>
          {<Route exact path="/Pooling"  element={<Pooling />}>
            
          </Route>}
          {<Route exact path="/Login"  element={<Login />}>
            
          </Route>}
          {<Route exact path="/Login/HomePage"  element={<Homepage/>}>
            
          </Route>}
          {<Route exact path="/Login/HomePage/AddProduct"  element={<AddProduct/>}>
            
          </Route>}
          {<Route exact path="/Login/HomePage/Cart"  element={<Cart/>}>
            
          </Route>}
      </Routes>
      </Router>
      
    </div>
  );
}

export default Outlet;
