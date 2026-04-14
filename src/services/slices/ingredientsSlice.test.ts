import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredients', () => {
  it('pending', () => {
    const state = ingredientsReducer(undefined, { type: fetchIngredients.pending.type });
    expect(state.loading).toBe(true);
  });

  it('fulfilled', () => {
    const mockData = [{ _id: '1', name: 'Тест' }];
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.fulfilled.type,
      payload: mockData
    });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockData);
  });

  it('rejected', () => {
    const state = ingredientsReducer(undefined, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});