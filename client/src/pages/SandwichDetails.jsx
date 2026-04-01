import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCustomItem, deleteCustomItem } from '../services/CustomItemsAPI'
import SandwichPreview from '../components/SandwichPreview'

const SandwichDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [sandwich, setSandwich] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSandwich = async () => {
      try {
        const data = await getCustomItem(id)
        setSandwich(data)
      } catch (err) {
        setError('Unable to load sandwich details.')
      }
    }

    fetchSandwich()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteCustomItem(id)
      navigate('/')
    } catch (err) {
      setError('Something went wrong while deleting the sandwich.')
    }
  }

  if (error) {
    return <p className="page-container error-message">{error}</p>
  }

  if (!sandwich) {
    return <p className="page-container">Loading sandwich details...</p>
  }

  return (
    <div className="page-container">
      <div className="details-card">
        <h1>{sandwich.name}</h1>
        <p><strong>Bread:</strong> {sandwich.bread}</p>
        <p><strong>Protein:</strong> {sandwich.protein}</p>
        <p><strong>Cheese:</strong> {sandwich.cheese}</p>
        <p><strong>Sauce:</strong> {sandwich.sauce}</p>
        <p><strong>Total Price:</strong> ${sandwich.totalprice}</p>

        <div className="card-buttons">
          <Link to={`/edit/${sandwich.id}`}>
            <button>Edit Sandwich</button>
          </Link>

          <button onClick={handleDelete}>Delete Sandwich</button>
        </div>
      </div>

      <SandwichPreview item={sandwich} />
    </div>
  )
}

export default SandwichDetails