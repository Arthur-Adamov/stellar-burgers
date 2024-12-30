import {userReducer, initialState, loginUser, registerUser, getUser, updateUser, logoutUser} from '../src/services/slices/userSlice/userSlice'

const mockUser = {
  "success":true,
  "user":{
    "email":"artur.adamov03340@yandex.ru",
    "name":"Артур"
  }
}

const mockError = {
  success: false,
  message: "error"
}

describe('тестируем userSlice', () => {
  describe('тесты авторизации пользователя', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: loginUser.pending.type }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(true)
      expect(state.loginUserError).toBe(null)
    })
    test('проверяем вызов экшена Success', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser.user
      }
      const state = userReducer(initialState, action)
      expect(state.data).toEqual(mockUser.user)
      expect(state.loginUserRequest).toBe(false)
      expect(state.isAuthenticated).toBe(true)
      expect(state.isAuthenticated).toBe(true)
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: loginUser.rejected.type,
        error: mockError
      }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(false)
      expect(state.loginUserError).toEqual(mockError.message)
      expect(state.isAuthChecked).toBe(true)
    })
  })

  describe('тесты регистрации пользователя', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: registerUser.pending.type }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(true)
      expect(state.loginUserError).toBe(null)
    })
    test('проверяем вызов экшена Success', () => {
      const action = { 
        type: registerUser.fulfilled.type,
        payload: mockUser.user
      }
      const state = userReducer(initialState, action)
      expect(state.data).toEqual(mockUser.user)
      expect(state.loginUserRequest).toBe(false)
      expect(state.isAuthenticated).toBe(true)
      expect(state.isAuthChecked).toBe(true)      
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: registerUser.rejected.type,
        error: mockError
      }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(false)
      expect(state.loginUserError).toEqual(mockError.message)
      expect(state.isAuthChecked).toBe(true)
    })
  })

  describe('тесты получения данных пользователя', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: getUser.pending.type }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(true)
      expect(state.loginUserError).toBe(null)
    })
    test('проверяем вызов экшена Success', () => {
      const action = { 
        type: getUser.fulfilled.type, 
        payload: mockUser
      }
      const state = userReducer(initialState, action)
      expect(state.data).toEqual(mockUser.user)
      expect(state.loginUserRequest).toBe(false)
      expect(state.isAuthenticated).toBe(true)
      expect(state.isAuthChecked).toBe(true)      
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: getUser.rejected.type,
        error: mockError
      }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(false)
      expect(state.loginUserError).toEqual(mockError.message)
      expect(state.isAuthChecked).toBe(true)
    })
  })

  describe('тесты обновления данных пользователя', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: updateUser.pending.type }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(true)
      expect(state.loginUserError).toBe(null)
    })
    test('проверяем вызов экшена Success', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      }
      const state = userReducer(initialState, action)
      expect(state.data).toEqual(mockUser.user)
      expect(state.loginUserRequest).toBe(false)
      expect(state.isAuthenticated).toBe(true)
      expect(state.isAuthChecked).toBe(true)
    })
    test('проверяем вызов экшена Failed', () => {
      const action = {
        type: updateUser.rejected.type,
        error: mockError
      }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(false)
      expect(state.loginUserError).toEqual(mockError.message)
      expect(state.isAuthChecked).toBe(true)
    })
  })

  describe('тесты выхода их системы пользователя', () => {
    test('проверяем вызов экшена Request', () => {
      const action = { type: logoutUser.pending.type }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(true)
      expect(state.loginUserError).toBe(null)
    })
    test('проверяем вызов экшена Success', () => {
      const action = { 
        type: logoutUser.fulfilled.type
      }
      const state = userReducer(initialState, action)
      expect(state.data).toBe(null)
      expect(state.loginUserRequest).toBe(false)
      expect(state.isAuthenticated).toBe(false)
      expect(state.isAuthChecked).toBe(true)
    })
    test('проверяем вызов экшена Failed', () => {
      const action = { 
        type: logoutUser.rejected.type,
        error: mockError
      }
      const state = userReducer(initialState, action)
      expect(state.loginUserRequest).toBe(false)
      expect(state.loginUserError).toEqual(mockError.message)
      expect(state.isAuthChecked).toBe(true)
    })
  })
})