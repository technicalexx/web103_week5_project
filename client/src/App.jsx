import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navigation from './components/Navigation'
import ViewSandwiches from './pages/ViewSandwiches'
import CreateSandwich from './pages/CreateSandwich'
import SandwichDetails from './pages/SandwichDetails'
import EditSandwich from './pages/EditSandwich'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<ViewSandwiches />} />
        <Route path="/new" element={<CreateSandwich />} />
        <Route path="/sandwich/:id" element={<SandwichDetails />} />
        <Route path="/edit/:id" element={<EditSandwich />} />
      </Routes>
    </>
  )
}

export default App