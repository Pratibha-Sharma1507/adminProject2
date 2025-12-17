import { createSlice } from '@reduxjs/toolkit';

const tokenKey = 'pap_token';
const userKey = 'pap_user';

const storedToken = localStorage.getItem(tokenKey);
const storedUser = localStorage.getItem(userKey);

const initialState = {
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem(tokenKey, token);
      localStorage.setItem(userKey, JSON.stringify(user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userKey);
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;


