// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Contact from './Pages/Contact';
import ChartsMaps from './Pages/Charts';
import Loader from './Components/loader';

// Define the main App component
const App: React.FC = () => {
  // State to manage the loader visibility
  const [loader, setLoader] = useState<boolean>(true);

  // Get the current location using useLocation hook
  const location = useLocation();

  // Function to handle navigation
  const handleNavigation = () => {
    setLoader(true);
    // Simulate loading delay
    setTimeout(() => {
      setLoader(false);
    }, 1500); // Adjust delay as needed
  };

  // Check for navigation on location change
  useEffect(() => {
    handleNavigation();
  }, [location]);

  // Render the component
  return (
    <div className='w-screen h-screen flex bg-[#0A192F]'>
      <NavBar />
      <div className='w-full overflow-x-hidden scrollable-content md:w-[calc(100vw-18rem)] md:pl-0'>
        {loader ? (
          // Show loader while loading
          <div className='h-screen flex items-center bg-[#0A192F] text-white justify-center overflow-hidden'>
            <Loader />
          </div>
        ) : (
          // Show content when not loading
          <Routes>
            <Route path='/' element={<Contact />} />
            <Route path='/chartMaps' element={<ChartsMaps />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

// Export the App component
export default App;
