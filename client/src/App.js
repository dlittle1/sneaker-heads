import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShoeForm from './pages/ShoeForm';
import Shoe from './pages/Shoe';
import LandingPage from './pages/LandingPage';
import { useSelector } from 'react-redux';
import ShoesGrid from './pages/ShoesGrid';
import Users from './pages/Users';
import ProfilePage from './pages/ProfilePage';

function App() {
  const user = useSelector((state) => state.currentUser.isLoggedIn);
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
          <Route path='/' element={<Home />}>
            <Route index element={<ShoesGrid sortby='numLikes' />} />
            <Route
              path='/shoes/new'
              element={<ShoesGrid sortby='createdAt' />}
            />
            <Route path='/shoes/name' element={<ShoesGrid sortby='name' />} />
            <Route path='/users' element={<Users />} />
          </Route>
          <Route path='/shoes/create' element={<ShoeForm />} />
          <Route path='/shoes/edit/:id' element={<ShoeForm />} />
          <Route path='/shoes/:id' element={<Shoe />} />
          <Route path='/users/:id' element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
