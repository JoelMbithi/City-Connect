import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Events from './Pages/Events';
import Notice from './Pages/Notice';
import Feedback from './Pages/Feedback';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="notice" element={<Notice />} />
        <Route path='feedback' element={<Feedback/>} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
