import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import Cart from "./pages/cart/cart";
import ProductPage from "./pages/product/ProductPage";
import CheckoutForm from "./pages/checkoutform/CheckoutForm"; // Import the CheckoutForm component
import { ShopContextProvider } from "./context/shop-context";
import ThankYou from "./pages/ThankYou/ThankYou";


function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
