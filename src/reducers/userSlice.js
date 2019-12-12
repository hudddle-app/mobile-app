import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "Joe Bob",
  email: "joebob@gmail.com",
  userId: 242221,
  loggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = !state.loggedIn;
    }
  }
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
