import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reservationReducer from './reservationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reservation: reservationReducer
  }
});
