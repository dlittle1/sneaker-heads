import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShoeForm from './pages/ShoeForm';
import Shoe from './pages/Shoe';
import LandingPage from './pages/LandingPage';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user.isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={user ? <Navigate replace to='/' /> : <LandingPage />}
        />
        <Route
          path='/signup'
          element={user ? <Navigate replace to='/' /> : <LandingPage />}
        />
        <Route element={!user ? <Navigate replace to='/login' /> : <Navbar />}>
          <Route path='/' element={<Home />} />
          <Route path='/shoes/create' element={<ShoeForm />} />
          <Route path='/shoes/edit/:id' element={<ShoeForm />} />
          <Route path='/shoes/:id' element={<Shoe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
