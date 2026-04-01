import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCustomItems, deleteCustomItem } from '../services/CustomItemsAPI'

const ViewSandwiches = () => {
  const [sandwiches, setSandwiches] = useState([])

  const fetchSandwiches = async () => {
    const data = await getAllCustomItems()
    setSandwiches(data)
  }

  useEffect(() => {
    fetchSandwiches()
  }, [])

  const handleDelete = async (id) => {
    await deleteCustomItem(id)
    fetchSandwiches()
  }

  return (
    <div className="page-container">
      <h1>Sandwich Studio</h1>
      <p>Build and save your custom sandwiches.</p>

      <Link to="/new">
        <button>Create Sandwich</button>
      </Link>

      {sandwiches.length === 0 ? (
        <p>No sandwiches saved yet.</p>
      ) : (
        <div className="sandwich-list">
          {sandwiches.map((sandwich) => (
            <div key={sandwich.id} className="sandwich-card">
              <h2>{sandwich.name}</h2>
              <p><strong>Bread:</strong> {sandwich.bread}</p>
              <p><strong>Protein:</strong> {sandwich.protein}</p>
              <p><strong>Cheese:</strong> {sandwich.cheese}</p>
              <p><strong>Sauce:</strong> {sandwich.sauce}</p>
              <p><strong>Total Price:</strong> ${sandwich.totalprice}</p>

              <div className="card-buttons">
                <Link to={`/sandwich/${sandwich.id}`}>
                  <button>View Details</button>
                </Link>

                <Link to={`/edit/${sandwich.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(sandwich.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewSandwiches