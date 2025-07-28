import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './hooks/useAuth.tsx';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Menu from './components/Menu';
import Orders from './components/Orders';
import Suggestions from './components/Suggestions';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/suggestions' element={<Suggestions />} />
          <Route path='*' element={<div>Page Not Found</div>} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;