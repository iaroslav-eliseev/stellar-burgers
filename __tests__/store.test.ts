import store from '../src/services/store';
import { RootReducer } from '../src/services/rootReducer';
import { expect } from '@jest/globals'

test('check rootReducer', () => {
  const expected = RootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  expect(expected).toEqual(store.getState());
});
