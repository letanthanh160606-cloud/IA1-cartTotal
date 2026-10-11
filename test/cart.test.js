import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

// assert.equal kiểm tra kết quả; assert.throws kiểm tra callback ném đúng loại lỗi.

// Test 1: example from the slides
// Subtotal = 180000 × 2 + 45000 = 405000; VAT = 32400; ship = 30000.
test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  // Tổng mong đợi = 405000 + 32400 + 30000 = 467400.
  assert.equal(cartTotal(items, options), 467400)
})

// Test 2: empty cart
// Giỏ rỗng phải trả 0 ngay, dù options vẫn có VAT và phí ship.
test('empty cart returns 0', () => {
  const items = []

  const options = {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
  }

  // Không tính VAT hoặc shipping cho giỏ rỗng.
  assert.equal(cartTotal(items, options), 0)
})

// Test 3: free shipping at the threshold
// Subtotal = 250000 × 2 = 500000, đúng bằng ngưỡng miễn ship.
test('free shipping at the threshold', () => {
  const items = [
    { name: 'Áo thun', price: 250000, qty: 2 },
  ]

  const options = {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
  }

  // VAT = 40000; ship = 0; tổng = 540000. Test này phát hiện dùng > thay vì >=.
  assert.equal(cartTotal(items, options), 540000)
})

// Test 4: negative price
// Chỉ price âm; qty = 1 hợp lệ để lỗi không đến từ số lượng.
test('negative price throws RangeError', () => {
  const items = [
    { name: 'Áo thun', price: -180000, qty: 1 },
  ]

  const options = {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
  }

  // Truyền callback vào assert.throws để nó gọi hàm và kiểm tra RangeError.
  assert.throws(
    () => cartTotal(items, options),
    RangeError
  )
})

// Test 5: non-integer quantity
// qty = 1.5 là số dương nhưng không nguyên; price vẫn hợp lệ.
test('non-integer quantity throws RangeError', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 1.5 },
  ]

  const options = {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
  }

  // Hàm phải ném RangeError vì số lượng không phải số nguyên dương.
  assert.throws(
    () => cartTotal(items, options),
    RangeError
  )
})

// Test 6: zero quantity
// qty = 0 là số nguyên nhưng không dương.
test('zero quantity throws RangeError', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 0 },
  ]

  const options = {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
  }

  // Hàm phải ném RangeError; chỉ Number.isInteger thôi là chưa đủ.
  assert.throws(
    () => cartTotal(items, options),
    RangeError
  )
})

// Test 7: negative quantity
// qty = -1 là số nguyên nhưng âm; price vẫn hợp lệ.
test('negative quantity throws RangeError', () => {
  const items = [{ name: 'Áo thun', price: 180000, qty: -1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  // Hàm phải ném RangeError vì số lượng phải lớn hơn 0.
  assert.throws(() => cartTotal(items, options), RangeError)
})

// Test 8: shipping uses subtotal before VAT
// Subtotal = 490000 < 500000; sau VAT là 529200, nhưng vẫn phải tính ship.
test('shipping uses subtotal before VAT', () => {
  const items = [{ name: 'Áo thun', price: 490000, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
  // VAT = 39200; ship = 30000; tổng = 559200.
  assert.equal(cartTotal(items, options), 559200)
})

// Test 9: free shipping above the threshold
// Subtotal = 300000 × 2 = 600000, lớn hơn ngưỡng 500000.
test('free shipping above the threshold', () => {
  const items = [{ name: 'Áo thun', price: 300000, qty: 2 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  // VAT = 48000; ship = 0; tổng = 648000.
  assert.equal(cartTotal(items, options), 648000)
})

// Test 10: zero price
// Giỏ có một món giá 0 khác với giỏ rỗng; giá 0 không bị cấm.
test('zero price is allowed and still incurs shipping below threshold', () => {
  const items = [{ name: 'Quà tặng', price: 0, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  // Subtotal = 0; VAT = 0; dưới ngưỡng nên tổng bằng phí ship 30000.
  assert.equal(cartTotal(items, options), 30000)
})

// Test 11: number return type
// Kiểm tra riêng kiểu dữ liệu, không kiểm tra thêm số tiền trong test này.
test('result has number type', () => {
  const items = [{ name: 'Sổ tay', price: 45000, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }

  // typeof kết quả phải là number; dùng toFixed() trực tiếp sẽ trả string và thất bại.
  assert.equal(typeof cartTotal(items, options), 'number')
})

// Test 12: round down
// Subtotal = 101; VAT = 8.08; ship = 0; tổng chưa làm tròn = 109.08.
test('rounds down when the fractional total is below half a dong', () => {
  const items = [{ name: 'Mẫu', price: 101, qty: 1 }]
  const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 0 }
  // Phần lẻ dưới 0.5 đồng nên Math.round trả 109.
  assert.equal(cartTotal(items, options), 109)
})

// Test 13: round up at half a dong
// Subtotal = 105; VAT = 10.5; ship = 0; tổng chưa làm tròn = 115.5.
test('rounds up when the fractional total is half a dong', () => {
  const items = [{ name: 'Mẫu', price: 105, qty: 1 }]
  const options = { vatRate: 0.1, freeShipFrom: 500000, shipFee: 0 }
  // Đúng nửa đồng phải làm tròn lên 116; Math.floor hoặc bỏ phần lẻ sẽ sai.
  assert.equal(cartTotal(items, options), 116)
})

// Test 14: round once at the end
// Subtotal = 101 + 101 = 202; VAT = 202 × 0.004 = 0.808; ship = 0.
test('rounds once after summing all items and VAT', () => {
  const items = [
    { name: 'Mẫu A', price: 101, qty: 1 },
    { name: 'Mẫu B', price: 101, qty: 1 },
  ]
  const options = { vatRate: 0.004, freeShipFrom: 500000, shipFee: 0 }
  // Làm tròn tổng 202.808 được 203; làm tròn từng món kèm VAT sẽ thành 101 + 101 = 202.
  assert.equal(cartTotal(items, options), 203)
})

