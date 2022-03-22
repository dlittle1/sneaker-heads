import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoeForm from './pages/ShoeForm';
import Shoe from './pages/Shoe';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shoes/create' element={<ShoeForm />} />
        <Route path='/shoes/edit/:id' element={<ShoeForm />} />
        <Route path='/shoes/:id' element={<Shoe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
