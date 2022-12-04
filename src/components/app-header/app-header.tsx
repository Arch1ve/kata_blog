import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import styles from './app-header.module.scss'

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">Realworld Blog</Link>
      <div>
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </header>
  )
}

export default memo(AppHeader)
