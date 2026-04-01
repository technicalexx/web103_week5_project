export const calculatePrice = (item) => {
  let total = 5

  if (item.bread === "Croissant") total += 2
  if (item.protein === "Turkey") total += 3
  if (item.protein === "Ham") total += 3
  if (item.protein === "Veggie") total += 2
  if (item.cheese === "Cheddar") total += 1
  if (item.cheese === "Swiss") total += 1
  if (item.sauce === "Mayo") total += 0.5
  if (item.sauce === "Mustard") total += 0.5
  if (item.sauce === "Chipotle") total += 1

  return total.toFixed(2)
}
