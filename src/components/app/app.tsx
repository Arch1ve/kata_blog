import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import CardList from '../article-list/article-list'
import Article from '../article/article'
import Layout from '../layout/layout'
import Login from '../login/login'
import RedactProfile from '../redact-profile/redact-profile'
import Registration from '../registration/registration'

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CardList />} />
          <Route path="articles" element={<CardList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="sign-up" element={<Registration />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="profile" element={<RedactProfile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
