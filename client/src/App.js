
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/Private";
import ForgotPasssword from "./pages/auth/ForgotPassword";
import AdminRoute from "./components/routes/AdminRoute";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { CreateCategory } from "./pages/admin/CreateCategory";
import { CreateProduct } from "./pages/admin/CreateProduct";
import { Users } from "./pages/admin/Users";
import { Products } from "./pages/admin/Products";
import { Orders } from "./pages/user/Orders";
import { Profile } from "./pages/user/Profile";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import  Categories  from "./pages/Categories";
import  CategoryProduct from "./pages/CategoryProduct";

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/category/:slug" element={<CategoryProduct/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPasssword/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
