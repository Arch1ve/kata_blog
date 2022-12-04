import { Pagination } from '@mui/material'
import React, { useEffect, FC, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import IArticlePreview from '../../models/IArticlePreview'
import { fetchArticles } from '../../store/reducers/actionCreators'
import ArticlePreview from '../article-preview/article-preview'

import styles from './article-list.module.scss'

const CardList: FC = () => {
  const dispatch = useAppDispatch()
  const { articles } = useAppSelector((state) => state.articles)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    dispatch(fetchArticles(false, pages * 5))
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
  return (
    <>
      <ul className={styles.list}>{items}</ul>
      <Pagination
        count={10 + pages}
        shape="rounded"
        color="primary"
        onChange={(_, num) => {
          setPages(num - 1)
        }}
      />
    </>
  )
}

export default CardList
