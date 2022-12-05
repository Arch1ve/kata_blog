import axios from 'axios'

import { AppDispatch } from '../store'

import { setArticles, setError, setLoading, setSingleArticle } from './articlesSlice'
import { logIn, setUserError } from './userSlice'

export const fetchArticles = (offset: number, token = '') => {
  return (dispatch: AppDispatch) => {
    const url = 'https://blog.kata.academy/api/articles'
    dispatch(setLoading(true))
    axios({ method: 'get', url, headers: { Authorization: token }, params: { limit: 5, offset } }).then(
      ({ data }) => {
        dispatch(setLoading(false))
        dispatch(setArticles(data.articles))
      },
      (error) => {
        setError(error.message)
      }
    )
  }
}

export const fetchSingleArticle = (slug: string | undefined, token = '') => {
  return (dispatch: AppDispatch) => {
    const url = `https://blog.kata.academy/api/articles/${slug}`
    dispatch(setLoading(true))
    axios({ method: 'get', url, headers: { Authorization: token } }).then(
      ({ data }) => {
        dispatch(setLoading(false))
        dispatch(setSingleArticle(data.article))
      },
      (error) => {
        setError(error.message)
      }
    )
  }
}

export const registerUser = (username: string, email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    axios({
      method: 'post',
      url: 'https://blog.kata.academy/api/users',
      data: {
        user: {
          username,
          email,
          password,
        },
      },
    }).then(
      (data) => {
        dispatch(logIn(data.data.user))
      },
      (err) => {
        dispatch(setUserError(err.response.data.errors))
      }
    )
  }
}

export const looginUser = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    axios({
      method: 'post',
      url: 'https://blog.kata.academy/api/users/login',
      data: {
        user: {
          email,
          password,
        },
      },
    }).then(
      (data) => {
        dispatch(logIn(data.data.user))
      },
      (err) => {
        dispatch(setUserError(err.response.data.errors))
      }
    )
  }
}
