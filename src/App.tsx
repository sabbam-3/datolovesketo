import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import DatePage from './pages/DatePage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/date/:id" element={<DatePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
