import { ingredientsReducer, getIngredients, initialState } from '../src/services/slices/ingredientSlice/ingredientSlice'

const mockIngredients = [
  {
    "_id": "643d69a5c3f7b9001cfa093e",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
  },
  {
    "_id": "643d69a5c3f7b9001cfa0942",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
  }
]

const mockError = {
  "success": false,
  "message": "error"
}

describe('тестируем ingredientSlice', () => {
  test('проверяем вызов экшена Request', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('проверяем вызов экшена Success', () => {
    const action = { type: getIngredients.fulfilled.type, payload: mockIngredients}
    const state = ingredientsReducer(initialState, action)
    expect(state.ingredients).toEqual(mockIngredients)
    expect(state.isLoading).toBe(false)
  })

  test('проверяем вызов экшена Failed', () => {
    const action = { type: getIngredients.rejected.type, error: mockError  }
    const state = ingredientsReducer(initialState, action)
    expect(state.error).toEqual(mockError.message)
    expect(state.isLoading).toBe(false)
  })
});
