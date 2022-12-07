import React, { FC, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logOut } from '../../store/reducers/userSlice'

import styles from './app-header.module.scss'

const AppHeader: FC = () => {
  const dispatch = useAppDispatch()
  const { username, image } = useAppSelector((state) => state.user.user)
  const navigate = useNavigate()

  const signIn = username ? null : <Link to="sign-in">Sign In</Link>
  const signUp = username ? null : (
    <Link to="sign-up" className={styles['sign-up']}>
      Sign Up
    </Link>
  )
  const createArticle = username ? (
    <Link to="new-article" className={styles.create}>
      Create article
    </Link>
  ) : null
  const profile = username ? (
    <Link to="/profile" className={styles.profile}>
      <h6 className={styles['profile-title']}>{username}</h6>
      <img className={styles['profile-img']} src={image} />
    </Link>
  ) : null
  const logOutBtn = username ? (
    <button
      className={styles.logout}
      onClick={() => {
        dispatch(logOut())
        return navigate('/articles')
      }}
    >
      Log Out
    </button>
  ) : null

  return (
    <header className={styles.header}>
      <Link to="/">Realworld Blog</Link>
      <div className={styles['link-area']}>
        {signIn}
        {signUp}
        {createArticle}
        {profile}
        {logOutBtn}
      </div>
    </header>
  )
}

export default memo(AppHeader)
