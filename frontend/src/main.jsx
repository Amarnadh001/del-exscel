import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import StoreContextProvider from './context/StoreContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

// Replace this with your actual Google OAuth client ID
const googleClientId = 'YOUR_GOOGLE_OAUTH_CLIENT_ID';

// Create the root for React to render into
const root = createRoot(document.getElementById('root'));

// Render the app with BrowserRouter, StoreContextProvider, and GoogleOAuthProvider
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={googleClientId}>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);