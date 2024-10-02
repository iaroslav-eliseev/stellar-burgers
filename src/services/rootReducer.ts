import { combineReducers } from 'redux';
import burgerIngredients from './slices/burgerIngredients';
import burgerConstructor from './slices/burgerConstructor';
import order from './slices/order';
import user from './slices/user';
import feed from './slices/feed';

export const RootReducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  order,
  user,
  feed
});
