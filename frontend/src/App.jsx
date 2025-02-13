import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Import only Route and Routes
import { GoogleOAuthProvider } from '@react-oauth/google';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Navbar from './components/Navbar/Navbar';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Replace this with your actual Google OAuth client ID
  const clientId = 'YOUR_GOOGLE_OAUTH_CLIENT_ID';

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        {/* Wrap the entire app with GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId={612337810337-j63ol0chrh0van60288aliue64tbr085.apps.googleusercontent.com}>
          <Navbar setShowLogin={setShowLogin} />

          {/* Define all routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </GoogleOAuthProvider>
      </div>

      <Footer />
    </>
  );
};

export default App;