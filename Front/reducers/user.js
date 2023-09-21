import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { id: null, admin: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.admin = action.payload.admin;
    },
    logout: (state, action) => {
      state.value.id = null;
      state.value.admin = null;
    },
  },
});

export const { login, logout} = userSlice.actions;
export default userSlice.reducer;
