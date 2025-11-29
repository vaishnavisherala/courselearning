import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import CourseDetail from './pages/CourseDetail.js';
import InstructorDashboard from './pages/InstructorDashboard.js';
import Contact from './pages/Contact.js';

import './index.css';
import './styles.css';

import HomeScreen from './components/HomeScreen.js';
import { CartProvider } from './context/CartContext.js';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
