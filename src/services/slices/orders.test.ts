import ordersReducer, { createOrder, clearOrderModal } from './orders';

describe('orders', () => {
  it('createOrder pending', () => {
    const state = ordersReducer(undefined, { type: createOrder.pending.type });
    expect(state.orderRequest).toBe(true);
  });

  it('clearOrderModal', () => {
    const state = ordersReducer(undefined, clearOrderModal());
    expect(state.orderModalData).toBeNull();
  });
});