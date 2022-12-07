import React, { FC, memo, useState } from 'react'
import { format } from 'date-fns'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import IArticlePreview from '../../models/IArticlePreview'
import { useAppSelector } from '../../hooks/redux'

import styles from './article-preview.module.scss'
import AcceptModal from './accept-modal'

interface ArticlePreviewProps {
  data: IArticlePreview
  header: boolean
}

const ArticlePreview: FC<ArticlePreviewProps> = ({ data, header }) => {
  const { title, likes, description, author, date, favorited, tagList, slug, preview } = data
  const { user } = useAppSelector((state) => state.user)
  const formatedDate = format(new Date(date), 'MMMM	d, Y')
  const [image, setImage] = useState<string>(author.image)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const tags = tagList.map((el, i) => {
    return (
      <li className={styles.tag} key={i}>
        {el}
      </li>
    )
  })

  const buttons = (
    <div className={styles.buttons}>
      <button className={classnames(styles.btn, styles['btn--delete'])} onClick={() => setIsModalOpen(true)}>
        Delete
      </button>
      {isModalOpen && <AcceptModal setOpen={setIsModalOpen} slug={slug} />}
      <Link className={classnames(styles.btn, styles['btn--edit'])} to={`/articles/${slug}/edit`}>
        Edit
      </Link>
    </div>
  )
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
        <div className={styles['description-content']}>
          <div className={styles['description-text']}>
            <h6 className={styles['profile-title']}>{author.username}</h6>
            <span className={styles.date}>{formatedDate}</span>
          </div>
          <img
            className={styles['profile-img']}
            src={image}
            onError={() => {
              setImage('https://static.productionready.io/images/smiley-cyrus.jpg')
            }}
          />
        </div>
        {user.username == author.username && !preview && buttons}
      </div>
    </>
  )
}

export default memo(ArticlePreview)
