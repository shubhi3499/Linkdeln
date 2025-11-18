import { createSlice } from "@reduxjs/toolkit";
import { getAboutUser, getAllUsers, loginUser, registerUser } from "../../action/authAction"; 
// ✅ correct path based on your folder structure

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  isTokenThere:false,
  profileFetched: false,
  connections: [],
  connectionRequest: [],
  all_profiles_fetched:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = "hello";
    },
    emptyMessage:(state)=>{
      state.message=""
    },
    setTokenIsThere:(state)=>{
      state.isTokenThere = true
    },
    setTokenIsNotThere:(state)=>{
      state.isTokenThere = false
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Knocking the door ...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.user = action.payload;
        state.message = "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🔹 Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Registering you ...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.user = action.payload;
        state.message = "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAboutUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.profileFetched = true;
        state.user = action.payload.profile
      })
      .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.all_profiles_fetched = true;
        state.all_users = action.payload.profiles
      })
  }
});

export const { reset, handleLoginUser,emptyMessage,setTokenIsThere,setTokenIsNotThere } = authSlice.actions;
export default authSlice.reducer;
