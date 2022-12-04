import axios from 'axios'

import { AppDispatch } from '../store'

import { setArticles, setError, setLoading, setSingleArticle } from './articlesSlice'

export const fetchArticles = (authorized: boolean, offset: number, token?: string) => {
  return (dispatch: AppDispatch) => {
    const url = 'https://blog.kata.academy/api/articles'
    dispatch(setLoading(true))
    if (authorized) {
      axios({
        method: 'get',
        url: `${url}/feed`,
        headers: { Authorization: token },
        params: { limit: 5, offset },
      }).then(
        ({ data }) => {
          dispatch(setLoading(false))
          dispatch(setArticles(data.articles))
        },
        (error) => {
          setError(error.message)
        }
      )
    } else {
      axios({ method: 'get', url, params: { limit: 5, offset } }).then(
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
}

export const fetchSingleArticle = (slug: string | undefined) => {
  return (dispatch: AppDispatch) => {
    const url = `https://blog.kata.academy/api/articles/${slug}`
    dispatch(setLoading(true))
    axios({ method: 'get', url }).then(
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
