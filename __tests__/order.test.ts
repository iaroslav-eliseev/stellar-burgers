import orderSlice, { initialState, getOrderByNumber } from '../src/services/slices/order';


describe('test orderSlice', () => {
  describe('test async POST request getOrderByNumber', () => {
    const actions = {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: ['someOrder'] }
      }
    };

    test('getOrderByNumber.pending', () => {
      const nextState = orderSlice(initialState, actions.pending);
      expect(nextState.request).toBe(true);
      expect(nextState.error).toBe(actions.pending.payload);
    });
    test('getOrderByNumber.rejected', () => {
      const nextState = orderSlice(initialState, actions.rejected);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(actions.rejected.error.message);
    });
    test('getOrderByNumber.fulfilled', () => {
      const nextState = orderSlice(initialState, actions.fulfilled);
      expect(nextState.request).toBe(false);
      expect(nextState.error).toBe(null);
      expect(nextState.orderByNumberResponse).toBe(
        actions.fulfilled.payload.orders[0]
      );
    });
  });
});
