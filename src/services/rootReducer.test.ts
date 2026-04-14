import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('должен возвращать правильное начальное состояние', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('user');
  });
});