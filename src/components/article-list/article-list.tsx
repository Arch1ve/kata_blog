import { Pagination, PaginationItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import IArticlePreview from '../../models/IArticlePreview'
import { fetchArticles } from '../../store/reducers/actionCreators'
import ArticlePreview from '../article-preview/article-preview'
import Loader from '../loader/loader'

import styles from './article-list.module.scss'

const CardList = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { articles, loading } = useAppSelector((state) => state.articles)
  const { user } = useAppSelector((state) => state.user)
  const [pages, setPages] = useState(parseInt(location.search?.split('=')[1] || '1'))

  useEffect(() => {
    const token = `Token ${user.token}`
    if (!location.search) {
      setPages(1)
    }
    dispatch(fetchArticles((pages - 1) * 5, token))
  }, [pages, location])

  const items = articles.map(
    ({ slug, title, description, updatedAt: date, tagList, favorited, favoritesCount: likes, author }) => {
      const data: IArticlePreview = {
        slug,
        title,
        description,
        date,
        tagList,
        favorited,
        likes,
        preview: true,
        author: { username: author.username, image: author.image },
      }
      return (
        <li className={styles.item} key={slug}>
          <ArticlePreview data={data} header={false} />
        </li>
      )
    }
  )
  const list = loading ? null : (
    <>
      <ul className={styles.list}>{items}</ul>
      <Pagination
        count={10 + pages}
        page={pages}
        shape="rounded"
        color="primary"
        onChange={(_, num) => {
          setPages(num)
        }}
        renderItem={(item) => <PaginationItem component={Link} to={`/articles?page=${item.page}`} {...item} />}
      />
    </>
  )
  const loader = loading ? <Loader /> : null
  return (
    <>
      {loader}
      {list}
    </>
  )
}

export default CardList
