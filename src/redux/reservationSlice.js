import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservedRooms: []
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    reserveRoom: (state, action) => {
      state.reservedRooms.push(action.payload);
    },
    updateReservedRoom: (state, action) => {
      const { index, updatedRoom } = action.payload;
      state.reservedRooms[index] = updatedRoom;
    }
  }
});

export const { reserveRoom, updateReservedRoom } = reservationSlice.actions;

export default reservationSlice.reducer;
