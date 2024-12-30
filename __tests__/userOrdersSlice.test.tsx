import { userOrderReducer, initialState, sendUserOrder, getUserOrders } from '../src/services/slices/userOrdersSlice/userOrdersSlice' 

const mockOrders = [
  {
    "_id": "6766a161750864001d37336c",
    "ingredients": [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0941"
    ],
    "status": "done",
    "name": "Флюоресцентный био-марсианский бургер",
    "createdAt": "2024-12-21T11:07:13.671Z",
    "updatedAt": "2024-12-21T11:07:14.616Z",
    "number": 63670
  },
  {
    "_id": "676e9f51750864001d37645e",
    "ingredients": [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa0942"
    ],
    "status": "done",
    "name": "Краторный spicy био-марсианский бургер",
    "createdAt": "2024-12-27T12:36:33.991Z",
    "updatedAt": "2024-12-27T12:36:34.803Z",
    "number": 64439
  }
]

const mockError = {
  "success": false,
  "message": "error"
}

describe('тестируем userOrdersSlice', () => {
  describe('проверяем отправку заказа пользователя', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: sendUserOrder.pending.type }
      const state = userOrderReducer(initialState, action)
      expect(state.isLoading).toBe(true)
      expect(state.error).toBe(null)
      expect(state.orderRequest).toBe(true)
    })
    test('проверяем вызов экшена Success', () => {
      const action = {
        type: sendUserOrder.fulfilled.type,
        payload: { order: mockOrders[0]}
      }
      const state = userOrderReducer(initialState, action)
      expect(state.order).toEqual(mockOrders[0])
      expect(state.isLoading).toBe(false)
      expect(state.orderRequest).toBe(false)
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: sendUserOrder.rejected.type,
        error: mockError
      }
      const state = userOrderReducer(initialState, action)
      expect(state.isLoading).toBe(false)
      expect(state.error).toEqual(mockError.message)
      expect(state.orderRequest).toBe(false)
    })
  })

  describe('проверяем получение заказов пользователя', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: getUserOrders.pending.type }
      const state = userOrderReducer(initialState, action)
      expect(state.error).toBe(null)
      expect(state.isLoading).toBe(true)
    })
    test('проверяем вызов экшена Success', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      }
      const state = userOrderReducer(initialState, action)
      expect(state.orders).toEqual(mockOrders)
      expect(state.isLoading).toBe(false)
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: getUserOrders.rejected.type,
        error: mockError
      }
      const state = userOrderReducer(initialState, action)
      expect(state.error).toEqual(mockError.message)
      expect(state.isLoading).toBe(false)
    })
  })
})


