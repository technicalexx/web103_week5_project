import { Link } from 'react-router-dom'
import '../css/Navigation.css'

const Navigation = () => {
  return (
    <nav className="navbar">
      <h1 className="nav-title">Sandwich Customizer 🥪</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/new">Create Sandwich</Link>
      </div>
    </nav>
  )
}

export default Navigation