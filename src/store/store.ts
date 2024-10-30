import { configureStore } from '@reduxjs/toolkit';
import polesReducer from './polesSlice';

const store = configureStore({
  reducer: {
    poles: polesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
