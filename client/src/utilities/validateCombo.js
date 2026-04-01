export const validateCombo = (item) => {
  if (item.protein === "Veggie" && item.cheese === "Cheddar") {
    return "Veggie sandwiches cannot be combined with Cheddar cheese."
  }

  return ""
}
