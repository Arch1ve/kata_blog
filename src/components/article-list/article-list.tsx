import { Pagination } from '@mui/material'
import React, { useEffect, FC, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import IArticlePreview from '../../models/IArticlePreview'
import { fetchArticles } from '../../store/reducers/actionCreators'
import ArticlePreview from '../article-preview/article-preview'
import Loader from '../loader/loader'

import styles from './article-list.module.scss'

const CardList: FC = () => {
  const dispatch = useAppDispatch()
  const { articles, loading } = useAppSelector((state) => state.articles)
  const { token } = useAppSelector((state) => state.user.user)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    dispatch(fetchArticles(pages * 5, token))
  }, [pages])

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
        page={pages + 1}
        shape="rounded"
        color="primary"
        onChange={(_, num) => {
          setPages(num - 1)
        }}
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
