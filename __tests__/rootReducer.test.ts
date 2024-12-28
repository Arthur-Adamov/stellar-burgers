import { store, rootReducer } from '../src/services/store'

describe('тестируем rootReducer', () => {
  test('тестируем изначальное состояние rootReducer', () => {
    const storeState = store.getState()
    expect(storeState).toEqual(rootReducer(undefined, { type: 'UNKNOWN_ACTION' }))
  })
})
