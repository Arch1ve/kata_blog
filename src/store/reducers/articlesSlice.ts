/* eslint-disable import/named */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import IArticle from '../../models/IArticle'

interface IArticlesState {
  articles: IArticle[]
  currentArticle: IArticle | null
  error: string
  loading: boolean
}

const initialState: IArticlesState = {
  articles: [],
  currentArticle: null,
  error: '',
  loading: true,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<IArticle[]>) {
      state.articles = action.payload
    },
    setSingleArticle(state, action: PayloadAction<IArticle>) {
      state.currentArticle = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})

const { setArticles, setLoading, setError, setSingleArticle } = articlesSlice.actions

export default articlesSlice.reducer
export { setArticles, setLoading, setError, setSingleArticle }
