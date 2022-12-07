import axios from 'axios'
import classnames from 'classnames'
import React, { FC, memo, useState } from 'react'

import { useAppSelector } from '../../hooks/redux'

import styles from './article-preview.module.scss'

interface LikeButtonProps {
  favorited: boolean
  slug: string
  likes: number
}

const LikeButton: FC<LikeButtonProps> = (props) => {
  const [likes, setLikes] = useState<number>(props.likes)
  const [favorited, setFavorited] = useState<boolean>(props.favorited)
  const { user } = useAppSelector((state) => state.user)

  const onClick = () => {
    const method = favorited ? 'delete' : 'post'
    const url = `https://blog.kata.academy/api/articles/${props.slug}/favorite`
    const token = `Token ${user.token}`
    axios({ method, url, headers: { Authorization: token } }).then((data) => {
      const article = data.data.article
      setLikes(article.favoritesCount)
      setFavorited(article.favorited)
    })
  }

  return (
    <>
      <button
        className={classnames(styles.likes, {
          [styles['likes--unchecked']]: !favorited,
          [styles['likes--checked']]: favorited,
        })}
        onClick={onClick}
      />
      <span className={styles['likes-text']}>{likes}</span>
    </>
  )
}

export default memo(LikeButton)
