/* eslint-disable import/named */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import IUser from '../../models/IUser'

interface initialUserState {
  user: IUser
  error: {
    username?: string
    email?: string
    'email or password'?: string
  }
}

const initialState: initialUserState = {
  user: {
    username: '',
    email: '',
    token: '',
  },
  error: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    logOut(state) {
      state.user = {
        username: '',
        email: '',
        token: '',
      }
    },
    setUserError(state, action: PayloadAction<object>) {
      state.error = action.payload
    },
  },
})

export const { logIn, logOut, setUserError } = userSlice.actions

export default userSlice.reducer
