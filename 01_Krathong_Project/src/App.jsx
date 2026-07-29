import { Route, Routes } from 'react-router-dom'
import Intro from './pages/Intro.jsx'
import ArExperience from './pages/ArExperience.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/ar" element={<ArExperience />} />
    </Routes>
  )
}

export default App
