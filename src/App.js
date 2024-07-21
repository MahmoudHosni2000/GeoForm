// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './Components/Auth/AuthPage';
import Map from './Components/Map/Map';
import List from './Components/List/List';
import Location from './Components/List/Location';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/map/list" element={<List />} />
        <Route path="/map" element={<Map />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </div>
  );
}

export default App;
