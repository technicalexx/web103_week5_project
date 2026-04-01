import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCustomItem } from '../services/CustomItemsAPI'
import { calculatePrice } from '../utilities/calcPrice'
import { validateCombo } from '../utilities/validateCombo'
import SandwichPreview from '../components/SandwichPreview'

const CreateSandwich = () => {
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

  useEffect(() => {
    const price = calculatePrice(item)
    setItem((prev) => ({
      ...prev,
      totalprice: price
    }))
  }, [item.bread, item.protein, item.cheese, item.sauce])

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
      await createCustomItem(item)
      navigate('/')
    } catch (err) {
      setError('Something went wrong while saving the sandwich.')
    }
  }

  return (
    <div className="page-container">
      <h1>Create Your Sandwich</h1>

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

        <button type="submit">Save Sandwich</button>
      </form>

      <SandwichPreview item={item} />
    </div>
  )
}

export default CreateSandwich