import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateShoe from './pages/CreateShoe'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shoes/create' element={<CreateShoe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
