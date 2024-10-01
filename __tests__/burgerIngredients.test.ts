  import burgerIngredientsSlice, {
    getIngredients,
    initialState
  } from '../src/services/slices/burgerIngredients';
  
  describe('test ingredientSlice', () => {
    describe('test async GET request getIngredients', () => {
      const actions = {
        pending: {
          type: getIngredients.pending.type,
          payload: null
        },
        rejected: {
          type: getIngredients.rejected.type,
          error: { message: 'Funny mock-error' }
        },
        fulfilled: {
          type: getIngredients.fulfilled.type,
          payload: ['ingr1', 'ingr2']
        }
      };
  
      test('getIngredients.pending', () => {
        const state = burgerIngredientsSlice(initialState, actions.pending);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(actions.pending.payload);
      });
  
      test('getIngredients.rejected', () => {
        const state = burgerIngredientsSlice(initialState, actions.rejected);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(actions.rejected.error.message);
      });
  
      test('getIngredients.fulfilled', () => {
        const nextState = burgerIngredientsSlice(initialState, actions.fulfilled);
        expect(nextState.loading).toBe(false);
        expect(nextState.ingredients).toEqual(actions.fulfilled.payload);
      });
    });
  });
