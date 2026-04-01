const BASE_URL = "http://localhost:3002/api/customitems"

export const getAllCustomItems = async () => {
  const response = await fetch(BASE_URL)
  return response.json()
}

export const getCustomItem = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  return response.json()
}

export const createCustomItem = async (item) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })

  return response.json()
}

export const updateCustomItem = async (id, item) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })

  return response.json()
}

export const deleteCustomItem = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })

  return response.json()
}
