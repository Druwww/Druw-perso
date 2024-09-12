import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/redux/store'

// Define a type for the slice state
export interface AuthState {
  isLogin: boolean,
  email: string
}

// Define the initial state using that type
export const initialStateAuth: AuthState = {
  isLogin: false,
  email: ""
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState : initialStateAuth,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.email = action.payload;
    },
    logout: state => {
      state.isLogin = initialStateAuth.isLogin;
      state.email = initialStateAuth.email;
    }
  }
})

export const { login, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer