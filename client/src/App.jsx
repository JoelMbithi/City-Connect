import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Events from './Pages/Events';
import Notice from './Pages/Notice';
import Feedback from './Pages/Feedback';
import NewsLetter from './Pages/NewsLetter';
import SupportPage from './Pages/Support';
import RequestsPage from './Pages/Request';
import ApplyForServicePage from './Pages/ApplyForService';
import AdminNavbar from '../src/Admin/Dashboard';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="notice" element={<Notice />} />
        <Route path='feedback' element={<Feedback/>} />
        <Route path='newsLetter' element={<NewsLetter/>} />
        <Route path='support' element={<SupportPage/>} />
        <Route path='requests' element={<RequestsPage/>} />
        <Route path='apply' element={<ApplyForServicePage/>} />
        <Route path="Admin/dashboard" element={<AdminNavbar/>} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
