import constructorReducer, {
  addIngredient,
  removeIngredient,
  resetConstructor
} from './burger-constructor';

describe('burgerConstructor', () => {
  const mockIngredient = {
    _id: '1',
    name: 'Тест',
    type: 'main',
    price: 100,
    image: '',
    image_large: '',
    image_mobile: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0
  };

  it('добавление ингредиента', () => {
    const state = constructorReducer(undefined, addIngredient(mockIngredient));
    expect(state.ingredients.length).toBe(1);
  });

  it('удаление ингредиента', () => {
    let state = constructorReducer(undefined, addIngredient(mockIngredient));
    const id = state.ingredients[0].id;
    state = constructorReducer(state, removeIngredient(id!));
    expect(state.ingredients.length).toBe(0);
  });

  it('сброс конструктора', () => {
    let state = constructorReducer(undefined, addIngredient(mockIngredient));
    state = constructorReducer(state, resetConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients.length).toBe(0);
  });
});