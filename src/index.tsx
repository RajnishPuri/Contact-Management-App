import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import App from './App'; 
import './index.css'; 
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { Provider } from 'react-redux'; // Import Provider to connect Redux store with React
import { store } from './Redux/store'; // Import the Redux store

// Get the root element from the HTML where the React app will be mounted
const rootElement = document.getElementById('root');

// Check if the root element exists. If not, throw an error.
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create a React root using the root element
const root = ReactDOM.createRoot(rootElement);

// Render the React app inside the root element
root.render(
  <React.StrictMode>
    {/* Wrap the app with Redux Provider to make the store available to all components */}
    <Provider store={store}>
      {/* Wrap the app with BrowserRouter to enable routing */}
      <BrowserRouter>
        {/* Render the main App component */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
