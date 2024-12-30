import { ordersReducer, initialState, getOrder, getOrders } from '../src/services/slices/ordersSlice/ordersSlice'

const mockOrders = {
  orders: [
    {
      "_id": "677253ca750864001d3769b4",
      "ingredients": [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093d"
      ],
      "status": "done",
      "name": "Флюоресцентный люминесцентный бургер",
      "createdAt": "2024-12-30T08:03:22.091Z",
      "updatedAt": "2024-12-30T08:03:22.999Z",
      "number": 64549
    },
    {
      "_id": "6771cd62750864001d376964",
      "ingredients": [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa0942"
      ],
      "status": "done",
      "name": "Space флюоресцентный spicy бургер",
      "createdAt": "2024-12-29T22:29:54.186Z",
      "updatedAt": "2024-12-29T22:29:55.156Z",
      "number": 64548
    }
  ],
  success: true,
  total: 64175,
  totalToday: 26
}

const mockError = {
  "success": false,
  "message": "error"
}

describe('тестируем orderslice', () => {
  describe('тесты получения заказа', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: getOrder.pending.type }
      const state = ordersReducer(initialState, action)
      expect(state.error).toBe(null)
      expect(state.isLoading).toBe(true)
    })
    test('проверяем вызов экшена Success', () => {
      const action = { 
        type: getOrder.fulfilled.type, 
        payload: { orders: mockOrders.orders[0] }}
      const state = ordersReducer(initialState, action)
      expect(state.order).toEqual(mockOrders.orders[0])
      expect(state.isLoading).toBe(false)
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: getOrder.rejected.type,
        error: mockError
      }
      const state = ordersReducer(initialState, action)
      expect(state.error).toEqual(mockError.message)
      expect(state.isLoading).toBe(false)
    })
  })

  describe('тесты получения заказов',() => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: getOrders.pending.type }
      const state = ordersReducer(initialState, action)
      expect(state.error).toBe(null)
      expect(state.isLoading).toBe(true)
    })
    test('проверяем вызов экшена Success', () => {
      const action = { 
        type: getOrders.fulfilled.type, 
        payload: { 
          orders: mockOrders.orders,
          total: mockOrders.total,
          totalToday: mockOrders.totalToday
        }
      }
      const state = ordersReducer(initialState, action)
      expect(state.orders).toEqual(mockOrders.orders)
      expect(state.isLoading).toBe(false)
      expect(state.total).toEqual(mockOrders.total)
      expect(state.totalToday).toEqual(mockOrders.totalToday)
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: getOrders.rejected.type,
        error: mockError
      }
      const state = ordersReducer(initialState, action)
      expect(state.error).toEqual(mockError.message)
      expect(state.isLoading).toBe(false)
    })
  })
})