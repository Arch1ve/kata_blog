import React, { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import AppHeader from '../app-header/app-header'

import styles from './layout.module.scss'

const Layout: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default memo(Layout)
