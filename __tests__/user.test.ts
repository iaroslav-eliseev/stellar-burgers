import userSlice, {
    getUser,
    getOrders,
    initialState,
    register,
    login,
    update,
    logout
  } from '../src/services/slices/user';
  
  describe('test userSlice', () => {
    describe('test async GET request getUser', () => {
      const actions = {
        pending: {
          type: getUser.pending.type,
          payload: null
        },
        rejected: {
          type: getUser.rejected.type,
          error: {
            message: 'error'
          },
          payload: {message : 'error'}
        },
        fulfilled: {
          type: getUser.fulfilled.type,
          payload: { user: { name: 'name', email: 'email' } }
        }
      };
  
      test('getUser.pending', () => {
        const state = userSlice(initialState, actions.pending);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
      });
  
      test('getUser.rejected', () => {
        const state = userSlice(initialState, actions.rejected);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
      });
  
      test('getUser.fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.loading).toBe(false);
        expect(nextState.user).toEqual(actions.fulfilled.payload.user);
      });
    });
    describe('test async GET request getOrders', () => {
      const actions = {
        pending: {
          type: getOrders.pending.type,
          payload: null
        },
        rejected: {
          type: getOrders.rejected.type,
          error: { message: 'error' }
        },
        fulfilled: {
          type: getOrders.fulfilled.type,
          payload: ['order1', 'order2']
        }
      };
  
      test('getOrdersAll.pending', () => {
        const state = userSlice(initialState, actions.pending);
        expect(state.error).toBe(null);
      });
  
      test('getOrdersAll.rejected', () => {
        const state = userSlice(initialState, actions.rejected);
        expect(state.error).toBe(actions.rejected.error.message);
      });
  
      test('getOrdersAll.fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.error).toBe(null);
        expect(nextState.userOrders).toEqual(actions.fulfilled.payload);
      });
    });
  
    describe('test async POST request register', () => {
      const actions = {
        pending: {
          type: register.pending.type,
          payload: null
        },
        rejected: {
          type: register.rejected.type,
          error: { message: 'error' }
        },
        fulfilled: {
          type: register.fulfilled.type,
          payload: { user: { name: 'name', email: 'email' } }
        }
      };
  
      test('registerUser.pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.error).toBe(null);
      });
      test('registerUser.rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.error).toBe(actions.rejected.error.message);
      });
      test('registerUser.fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.error).toBe(null);
      });
    });
    describe('test async POST request login', () => {
      const actions = {
        pending: {
          type: login.pending.type,
          payload: null
        },
        rejected: {
          type: login.rejected.type,
          error: { message: 'error' }
        },
        fulfilled: {
          type: login.fulfilled.type,
          payload: { user: { name: 'name', email: 'email' } }
        }
      };
  
      test('loginUser.pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.error).toBe(null);
      });
      test('loginUser.rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.error).toBe(actions.rejected.error.message);
      });
      test('loginUser.fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.error).toBe(null);
        expect(nextState.user).toBe(actions.fulfilled.payload.user);
      });
    });
    describe('test async PATCH request update', () => {
      const actions = {
        pending: {
          type: update.pending.type,
          payload: null
        },
        rejected: {
          type: update.rejected.type,
          error: { message: 'error' }
        },
        fulfilled: {
          type: update.fulfilled.type,
          payload: { user: { name: 'name', email: 'email' } }
        }
      };
  
      test('updateUser.pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.error).toBe(null);
      });
      test('updateUser.rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.error).toBe(actions.rejected.error.message);
      });
      test('updateUser.fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.error).toBe(null);
        expect(nextState.user).toBe(actions.fulfilled.payload.user);
      });
    });
    describe('test async POST request logout', () => {
      const actions = {
        pending: {
          type: logout.pending.type,
          payload: null
        },
        rejected: {
          type: logout.rejected.type,
          error: { message: 'error' }
        },
        fulfilled: {
          type: logout.fulfilled.type,
          payload: null
        }
      };
  
      test('logoutUser.pending', () => {
        const nextState = userSlice(initialState, actions.pending);
        expect(nextState.error).toBe(null);
      });
      test('logoutUser.rejected', () => {
        const nextState = userSlice(initialState, actions.rejected);
        expect(nextState.error).toBe(actions.rejected.error.message);
      });
      test('logoutUser.fulfilled', () => {
        const nextState = userSlice(initialState, actions.fulfilled);
        expect(nextState.error).toBe(null);
        expect(nextState.user).toBe(null);
      });
    });
  });
