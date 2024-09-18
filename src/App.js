import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuestList from './pages/QuestList';

import axios from 'axios';
axios.defaults.withCredentials = true;
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quests" element={<QuestList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;