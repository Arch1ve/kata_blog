import React, { FC, memo } from 'react'
import { format } from 'date-fns'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import IArticlePreview from '../../models/IArticlePreview'

import styles from './article-preview.module.scss'

interface ArticlePreviewProps {
  data: IArticlePreview
  header: boolean
}

const ArticlePreview: FC<ArticlePreviewProps> = ({ data, header }) => {
  const { title, likes, description, author, date, favorited, tagList, slug } = data
  const formatedDate = format(new Date(date), 'MMMM	d, Y')

  const tags = tagList.map((el, i) => {
    return (
      <li className={styles.tag} key={i}>
        {el}
      </li>
    )
  })
  return (
    <>
      <div className={styles.content}>
        <div className={styles['title-area']}>
          <h5 className={styles.title}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h5>
          <button
            className={classnames(styles.likes, {
              [styles['likes--unchecked']]: !favorited,
              [styles['likes--checked']]: favorited,
            })}
          ></button>
          <span className={styles['likes-text']}>{likes}</span>
        </div>
        <ul className={classnames(styles['tag-list'], { [styles['tag-list--article']]: header })}>{tags}</ul>
        <p className={styles.text}>{description}</p>
      </div>
      <div className={styles.description}>
        <div className={styles['description-text']}>
          <h6 className={styles['profile-title']}>
            <a className={styles['profile-link']} href="#">
              {author.username}
            </a>
          </h6>
          <span className={styles.date}>{formatedDate}</span>
        </div>
        <img className={styles['profile-img']} src={author.image} />
      </div>
    </>
  )
}

export default memo(ArticlePreview)
