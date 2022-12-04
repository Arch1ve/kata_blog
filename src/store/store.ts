import { combineReducers, configureStore } from '@reduxjs/toolkit'

import articlesReducer from './reducers/articlesSlice'

const rootReducer = combineReducers({ articles: articlesReducer })

export const setupStore = () => {
  return configureStore({ reducer: rootReducer })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
