// Calculate cart total according to README.md.
export function cartTotal(items, options) {
  // 1. Empty cart
  if (items.length === 0) {
    return 0
  }

  // 2. Validate items
  for (const item of items) {
    if (item.price < 0) {
      throw new RangeError('Price cannot be negative')
    }

    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError('Quantity must be a positive integer')
    }
  }

  // 3. Calculate subtotal
  let subtotal = 0

  for (const item of items) {
    subtotal += item.price * item.qty
  }

  // 4. Calculate VAT
  const vat = subtotal * options.vatRate

  // 5. Calculate shipping
  let shipping = options.shipFee

  if (subtotal >= options.freeShipFrom) {
    shipping = 0
  }

  // 6. Calculate final total
  const total = subtotal + vat + shipping

  // 7. Round
  return Math.round(total)
}
