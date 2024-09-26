import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginWithGoogleButton from "./auth/LoginWithGoogleButton";
import SocialAuth from "../src/auth/SocialAuth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";
import Generated from "./pages/Generated";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SignupPage from "./pages/SignupPage";
import CheckoutPage from "./pages/CheackoutPage";
import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminPromo from "./pages/AdminPromo";
import Designs from "./pages/Designs";
import AdminCities from "./pages/AdminCities.js";
import AdminDesigns from "./pages/AdminDesigns";
import TermsAndConditions from "./pages/TermsAndConditions.js";
import TermsOfUse from "./pages/TermsOfUse.js";
import RefundPolicy from "./pages/RefundPolicy.js";
import PrivacyPolicy from "./pages/PrivacyPolicy.js";
import OrderDetails from "./pages/order.js";
import { UserProvider } from "./auth/UserContext";
import NotificationBar from "./Components/NotificationBar.js";
import AboutUs from "./pages/AboutUs.js";
import FAQ from "./pages/FAQ.js";
import ShippingPolicy from "./pages/ShippingPolicy.js";

function App() {
  return (
    <UserProvider>
      <NotificationBar/>
      <Routes>
        <Route path="/auth" element={<LoginWithGoogleButton />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/google" element={<SocialAuth />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/SignUp" element={<SignupPage />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/designs/:designId" element={<Designs />} />
        <Route path="/admin" element={<Admin />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route path="/generated/:custom/:id" element={<Generated />} />
        <Route path="/product/:productKey" element={<ProductPage />} />
        <Route path="/order/:order_id" element={<OrderDetails />} />
        <Route exact path="/admin/products" element={<AdminProducts />} />
        <Route exact path="/admin/designs" element={<AdminDesigns />} />
        <Route exact path="/admin/promo" element={<AdminPromo />} />
        <Route exact path="/admin/orders" element={<AdminOrders />} />
        <Route exact path="/admin/users" element={<AdminUsers />} />
        <Route exact path="/admin/cities" element={<AdminCities />} />
        <Route exact path="/termsandcondition" element={<TermsAndConditions />} />
        <Route exact path="/termsofuse" element={<TermsOfUse />} />
        <Route exact path="/RefundPolicy" element={<RefundPolicy />} />
        <Route exact path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route exact path="/AboutUs" element={<AboutUs />} />
        <Route exact path="/FAQ" element={<FAQ />} />
        <Route exact path="/ShippingPolicy" element={<ShippingPolicy />} />

      </Routes>
    </UserProvider>
  );
}

export default App;
