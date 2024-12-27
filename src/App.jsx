import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Categories from './Categories';
import Authentication from './Authentication';
import Pnf from './Pnf';
import AdminDashboard from './admin/AdminDashboard';
import PrivateRoute from './admin/PrivateRoute'; // Import the PrivateRoute
import Add from './admin/Add';
import ProductsAdded from './admin/ProductsAdded';
import AddtoCart from './AddtoCart';
import Wishlist from './Wishlist';
import Orderplace from './Orderplace';
import Ordersuccess from './Ordersuccess';
import BMICalculator from './BMICalculator';
// import PaymentPage from './Paymentpage';
import OrderQRCode from './OrderQRCode';
import Review from './Review';
import OrderList from './admin/OrderList';
import ViewAddress from './admin/ViewAddress';
import MyOrders from './MyOrders';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/view-cart" element={<AddtoCart />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/register" element={<Authentication insideRegister={true} />} />
        <Route path="/wishlist" element={< Wishlist/>} />
        <Route path='/place-order' element={<Orderplace/>}/>
        <Route path="/pnf" element={<Pnf />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/order-success" element={<Ordersuccess />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        {/* <Route path="/Paymentpage" element={<PaymentPage/>} /> */}
        <Route path="/OrderQRCode" element={<OrderQRCode/>} />
        <Route path='/my-orders' element={<MyOrders/>}/>
        {/* Protected route for admin dashboard */}
        <Route path="/admin-dashboard"element={<PrivateRoute element={<AdminDashboard />} />}
        />
        <Route path="/add"element={<PrivateRoute element={<Add />} />}
        />
          <Route path="/order-lists"element={<PrivateRoute element={<OrderList />} />}
        />
        <Route path="/products"element={<PrivateRoute element={<ProductsAdded/>} />}
        />
        <Route path="/view-address-admin"element={<PrivateRoute element={<ViewAddress/>} />}
        />

      </Routes>
    </>
  );
}

export default App;
