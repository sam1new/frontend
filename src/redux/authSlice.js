import { Refresh } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  refresh: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setUser: (state,action) =>{
      state.user = action.payload
    },
    reset: () => initialState,
  }
});

export const { login, logout,setUser,reset } = authSlice.actions;

export default authSlice.reducer;
