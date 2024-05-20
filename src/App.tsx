import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import MovieSeatBooking from './Pages/MovieSeatBooking';
import Footer from './components/Footer';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/seat/:id' element={<MovieSeatBooking />} />
        <Route path='/login' element={<Auth></Auth>}></Route>
        <Route path='/register' element={<Auth register></Auth>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
