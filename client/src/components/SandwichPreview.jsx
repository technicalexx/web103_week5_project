const SandwichPreview = ({ item }) => {
  const breadClass = item.bread.toLowerCase()
  const proteinClass = item.protein.toLowerCase()
  const cheeseClass = item.cheese.toLowerCase()
  const sauceClass = item.sauce.toLowerCase()

  return (
    <div className="preview-wrapper">
      <h2>Sandwich Preview</h2>

      {item.name && <p className="preview-name">{item.name}</p>}

      <div className="sandwich-preview">
        <div className={`bread top-bread ${breadClass}`}>
          {item.bread}
        </div>

        <div className={`protein-layer ${proteinClass}`}>
          {item.protein}
        </div>

        {item.cheese !== 'None' && (
          <div className={`cheese-layer ${cheeseClass}`}>
            {item.cheese}
          </div>
        )}

        <div className={`sauce-layer ${sauceClass}`}>
          {item.sauce}
        </div>

        <div className={`bread bottom-bread ${breadClass}`}>
          {item.bread}
        </div>
      </div>
    </div>
  )
}

export default SandwichPreview