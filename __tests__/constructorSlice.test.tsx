import { constructorSlice, initialState, addIngredient, deleteIngredient, moveUp, moveDown } from '../src/services/slices/constructorSlice/constructorSlice'

const mockIngredient = {
  "_id": "643d69a5c3f7b9001cfa0941",
  "name": "Биокотлета из марсианской Магнолии",
  "type": "main",
  "proteins": 420,
  "fat": 142,
  "carbohydrates": 242,
  "calories": 4242,
  "price": 424,
  "image": "https://code.s3.yandex.net/react/code/meat-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
  "__v": 0
}

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

describe("тестируем constructorSlice", () => {

  test("добавление ингредиента в конструктор", () => {
    const action = { type: addIngredient.type, payload: mockIngredient }
    expect(constructorSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: [mockIngredient]
    })
  })

  test('удаление ингредиента из конструктора', () => {
    const action = { type: deleteIngredient.type, payload: mockIngredient }
    expect(constructorSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: []
    })
  })

  test('изменение порядка ингредиента вверх', () => {
    const action = { type: moveUp.type, payload: 1 }
    const state = {
      ...initialState,
      ingredients: [{...mockIngredients[0], id: '1'}, {...mockIngredients[1], id: '2'}]
    }
    expect(constructorSlice.reducer(state, action)).toEqual({...initialState,
      ingredients: [{...mockIngredients[1], id: '2'}, {...mockIngredients[0], id: '1'}]})
  })

  test('изменение порядка ингредиента вниз', () => {
    const action = { type: moveDown.type, payload: 0 }
    const state = {
      ...initialState,
      ingredients: [{...mockIngredients[0], id: '1'}, {...mockIngredients[1], id: '2'}]
    }
    expect(constructorSlice.reducer(state, action)).toEqual({...initialState,
      ingredients: [{...mockIngredients[1], id: '2'}, {...mockIngredients[0], id: '1'}]})
  });
})