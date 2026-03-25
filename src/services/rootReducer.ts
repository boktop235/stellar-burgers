import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import constructorReducer from './slices/burger-constructor';
import ordersReducer from './slices/orders';
import feedReducer from './slices/feedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  orders: ordersReducer,
  feed: feedReducer // именно feed, не feeds
});
