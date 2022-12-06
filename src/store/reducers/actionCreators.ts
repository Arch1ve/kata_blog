import axios from 'axios'

import { AppDispatch } from '../store'

import { setArticles, setError, setLoading, setSingleArticle } from './articlesSlice'
import { logIn, setUserError, setUserImage } from './userSlice'

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
        const user = data.data.user
        dispatch(logIn(user))
        axios({ method: 'get', url: `https://blog.kata.academy/api/profiles/${user.username}` }).then(
          (data) => {
            dispatch(setUserImage(data.data.profile.image))
          },
          (err) => {
            setError(err.message)
          }
        )
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
        const user = data.data.user
        dispatch(logIn(user))
        axios({ method: 'get', url: `https://blog.kata.academy/api/profiles/${user.username}` }).then(
          (data) => {
            dispatch(setUserImage(data.data.profile.image))
          },
          (err) => {
            setError(err.message)
          }
        )
      },
      (err) => {
        dispatch(setUserError(err.response.data.errors))
      }
    )
  }
}

export const updateUserInfo = (data: object, token: string) => {
  return (dispatch: AppDispatch) => {
    const url = 'https://blog.kata.academy/api/user'
    axios({
      method: 'put',
      url,
      headers: { Authorization: token },
      data: {
        user: data,
      },
    }).then(
      (data) => {
        const user = data.data.user
        dispatch(logIn(user))
      },
      (err) => {
        dispatch(setError(err.message))
      }
    )
  }
}
