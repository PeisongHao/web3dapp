import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConsolePage from './Page/ConsolePage/ConsolePage';
import TwitterSuccess from './Page/TwitterPage/TwitterSuccess';
import TwitterFail from './Page/TwitterPage/TwitterFail';
import ClaimPage from './Page/ClaimPage/ClaimPage';
import ProtectedRoute from './Components/ProtectedRoute';
function App() {
  return (
   <Router>
    <div className='App'>
      <Routes>
        <Route path ="/" element ={<ConsolePage/>}/>
        <Route path ="/twittersuccess" element ={<TwitterSuccess/>}/>
        <Route path ="/twitterfail" element ={<TwitterFail/>}/>
        <Route 
            path="/claim" 
            element={
              <ProtectedRoute>
                <ClaimPage />
              </ProtectedRoute>
            } 
        />
      </Routes>
    </div>
   </Router>
  );
}

export default App;
