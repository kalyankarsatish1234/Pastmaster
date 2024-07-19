import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CreatePastePage from './pages/CreatePastePage';
import GetPastePage from './pages/GetPastePage';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-center text-blue-600">PasteMaster</h1>
          <nav className="mb-6 text-center">
            <Link
              to="/create"
              className="bg-blue-600 text-white p-2 md:p-3 rounded-lg hover:bg-blue-700 transition duration-300 mx-2 text-sm md:text-base"
            >
              Create Paste
            </Link>
            <Link
              to="/get"
              className="bg-blue-600 text-white p-2 md:p-3 rounded-lg hover:bg-blue-700 transition duration-300 mx-2 text-sm md:text-base"
            >
              Get Paste
            </Link>
          </nav>
          <Routes>
            <Route path="/create" element={<CreatePastePage />} />
            <Route path="/get" element={<GetPastePage />} />
            <Route path="/" element={<Navigate to="/create" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
