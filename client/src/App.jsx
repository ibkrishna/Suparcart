import { Route, Routes, useLocation } from "react-router-dom"; // Import useLocation
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth, loadUserFromLocalStorage } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Footer from "./pages/shopping-view/footer";
import Bestsellers from "./pages/shopping-view/bestsellers";
import About from "./components/Footer-component/About";
import Contactus from "./components/Footer-component/Contactus";
import Privacy from "./components/Footer-component/Privacy";
import TermsandCondition from "./components/Footer-component/TermsandCondition";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location


  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);


  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <Skeleton className="animate-spin w-14 h-14 rounded-full border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }
  

  // Define paths where the footer should not be displayed
  const noFooterPaths = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password'
  ];

  // Check if the current path is in noFooterPaths
  const shouldDisplayFooter = !noFooterPaths.includes(location.pathname);




  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} /> 
          <Route path="shop/home" element={<ShoppingHome />} />
          <Route path="shop/listing" element={<ShoppingListing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contactus />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms&condition" element={<TermsandCondition />} />
          <Route path="shop/bestsellers" element={<Bestsellers />} />
          <Route path="shop/search" element={<SearchProducts />} />
          <Route path="shop/paypal-return" element={<PaypalReturnPage />} />
          <Route path="shop/payment-success" element={<PaymentSuccessPage />} />
          <Route path="shop/checkout" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingCheckout /></CheckAuth>} />
          <Route path="shop/account" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingAccount /></CheckAuth>} />
        </Route>
        
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        
        <Route path="/unauth-page" element={<UnauthPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldDisplayFooter && <Footer/>}
    </div>
  );
}

export default App;
