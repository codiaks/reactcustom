import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  userName: "",
  email: "",
  profileImg : "",
  role : {},
  userId : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken.value;
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.profileImg = action.payload.picture;
      state.role = action.payload.role;
      state.userId = action.payload.id;
    },
    logout: () => {},
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
