import { multiply } from '../src/multiply'

describe('[multiply] функция умножения двух чисел', () => {
  test('умножение положительных чисел', () => {
    expect(multiply(2, 3)).toBe(6)
  })
})
