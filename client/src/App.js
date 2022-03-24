import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoeForm from './pages/ShoeForm';
import Shoe from './pages/Shoe';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route element={<Navbar />}>
          <Route path='/shoes' element={<Home />} />
          <Route path='/shoes/create' element={<ShoeForm />} />
          <Route path='/shoes/edit/:id' element={<ShoeForm />} />
          <Route path='/shoes/:id' element={<Shoe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
