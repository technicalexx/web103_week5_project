import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getCustomItem,
  updateCustomItem,
  deleteCustomItem
} from '../services/CustomItemsAPI'
import { calculatePrice } from '../utilities/calcPrice'
import { validateCombo } from '../utilities/validateCombo'
import SandwichPreview from '../components/SandwichPreview'

const EditSandwich = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState({
    name: '',
    bread: 'White',
    protein: 'Turkey',
    cheese: 'Swiss',
    sauce: 'Mayo',
    totalprice: '0.00'
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSandwich = async () => {
      try {
        const data = await getCustomItem(id)
        setItem(data)
      } catch (err) {
        setError('Unable to load sandwich.')
      } finally {
        setLoading(false)
      }
    }

    fetchSandwich()
  }, [id])

  useEffect(() => {
    if (!loading && item.name !== '') {
      const price = calculatePrice(item)
      setItem((prev) => ({
        ...prev,
        totalprice: price
      }))
    }
  }, [item.bread, item.protein, item.cheese, item.sauce, loading])

  const handleChange = (event) => {
    const { name, value } = event.target
    setItem((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const comboError = validateCombo(item)

    if (comboError) {
      setError(comboError)
      return
    }

    setError('')

    try {
      await updateCustomItem(id, item)
      navigate(`/sandwich/${id}`)
    } catch (err) {
      setError('Something went wrong while updating the sandwich.')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteCustomItem(id)
      navigate('/')
    } catch (err) {
      setError('Something went wrong while deleting the sandwich.')
    }
  }

  if (loading) {
    return <p className="page-container">Loading sandwich...</p>
  }

  return (
    <div className="page-container">
      <h1>Edit Sandwich</h1>

      <form onSubmit={handleSubmit} className="sandwich-form">
        <label htmlFor="name">Sandwich Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Enter sandwich name"
          required
        />

        <label htmlFor="bread">Bread</label>
        <select
          id="bread"
          name="bread"
          value={item.bread}
          onChange={handleChange}
        >
          <option value="White">White</option>
          <option value="Wheat">Wheat</option>
          <option value="Croissant">Croissant</option>
        </select>

        <label htmlFor="protein">Protein</label>
        <select
          id="protein"
          name="protein"
          value={item.protein}
          onChange={handleChange}
        >
          <option value="Turkey">Turkey</option>
          <option value="Ham">Ham</option>
          <option value="Veggie">Veggie</option>
        </select>

        <label htmlFor="cheese">Cheese</label>
        <select
          id="cheese"
          name="cheese"
          value={item.cheese}
          onChange={handleChange}
        >
          <option value="Swiss">Swiss</option>
          <option value="Cheddar">Cheddar</option>
          <option value="None">None</option>
        </select>

        <label htmlFor="sauce">Sauce</label>
        <select
          id="sauce"
          name="sauce"
          value={item.sauce}
          onChange={handleChange}
        >
          <option value="Mayo">Mayo</option>
          <option value="Mustard">Mustard</option>
          <option value="Chipotle">Chipotle</option>
        </select>

        <h3>Total Price: ${item.totalprice}</h3>

        {error && <p className="error-message">{error}</p>}

        <div className="card-buttons">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleDelete}>
            Delete Sandwich
          </button>
        </div>
      </form>

      <SandwichPreview item={item} />
    </div>
  )
}

export default EditSandwich