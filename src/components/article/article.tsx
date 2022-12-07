import React, { FC, memo, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import IArticlePreview from '../../models/IArticlePreview'
import { fetchSingleArticle } from '../../store/reducers/actionCreators'
import ArticlePreview from '../article-preview/article-preview'
import Loader from '../loader/loader'

import styles from './article.module.scss'

const Article: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const { loading, currentArticle } = useAppSelector((state) => state.articles)
  const { user } = useAppSelector((state) => state.user)

  useEffect(() => {
    const token = `Token ${user.token}`
    dispatch(fetchSingleArticle(slug, token))
  }, [])

  let artcileContent = null
  if (currentArticle) {
    const {
      slug,
      title,
      description,
      updatedAt: date,
      tagList,
      favorited,
      favoritesCount: likes,
      author,
      body,
    } = currentArticle
    const data: IArticlePreview = {
      slug,
      title,
      description,
      date,
      tagList,
      favorited,
      likes,
      preview: false,
      author: { username: author.username, image: author.image },
    }

    artcileContent = (
      <>
        <header className={styles.header}>
          <ArticlePreview data={data} header={true} />
        </header>
        <div className={styles.content}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </>
    )
  }

  return (
    <article className={styles.article}>
      {loading && <Loader />}
      {!loading && artcileContent}
    </article>
  )
}

export default memo(Article)
