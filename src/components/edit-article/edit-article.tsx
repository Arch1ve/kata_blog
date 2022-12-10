import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchSingleArticle } from '../../store/reducers/actionCreators'
import { setSingleArticle } from '../../store/reducers/articlesSlice'
import NewArcticle from '../new-article/new-article'

const EditArticle = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    const token = `Token ${user.token}`
    dispatch(fetchSingleArticle(slug, token))
    return () => {
      dispatch(setSingleArticle(null))
    }
  }, [])

  return <NewArcticle />
}

export default EditArticle
