import userReducer, { loginUser, logoutUser } from './userSlice';

describe('user', () => {
  it('loginUser fulfilled', () => {
    const mockUser = { email: 'test@test.com', name: 'Test' };
    const state = userReducer(undefined, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.user).toEqual(mockUser);
  });

  it('logoutUser fulfilled', () => {
    const state = userReducer(undefined, { type: logoutUser.fulfilled.type });
    expect(state.user).toBeNull();
  });
});