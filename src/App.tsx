import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DesignTokensPage } from './pages/desing/Design.tsx'
import { Home } from './pages/home/Home.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desing" element={<DesignTokensPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
