import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import styles from './app-header.module.scss'

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Realworld Blog</Link>
      <div className={styles['link-area']}>
        <Link to="sign-in">Sign In</Link>
        <Link to="sign-up" className={styles['sign-up']}>
          Sign Up
        </Link>
      </div>
    </header>
  )
}

export default memo(AppHeader)
