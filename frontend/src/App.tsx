import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import MatterList from './components/MatterList';
import MatterForm from './components/MatterForm';
import MatterDetails from './components/MatterDetails';
import CustomerDetails from './components/CustomerDetails';

const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && (
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-xl font-bold text-indigo-600">Panther</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/customers"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Customers
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={logout}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/customers" />} />
              <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/login" />} />
              
              {/* Customer routes */}
              <Route
                path="/customers"
                element={isAuthenticated ? <CustomerList /> : <Navigate to="/login" />}
              />
              <Route
                path="/customers/:id"
                element={isAuthenticated ? <CustomerDetails /> : <Navigate to="/login" />}
              />

              {/* Matter routes nested under customers */}
              <Route
                path="/customers/:customerId/matters"
                element={isAuthenticated ? <MatterList /> : <Navigate to="/login" />}
              />
              <Route
                path="/customers/:customerId/matters/:id/view"
                element={isAuthenticated ? <MatterDetails /> : <Navigate to="/login" />}
              />

              {/* Redirect root to customers */}
              <Route path="/" element={<Navigate to={isAuthenticated ? "/customers" : "/login"} />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Panther. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App; 