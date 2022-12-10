import React, { memo } from 'react'
import { Routes, Route } from 'react-router-dom'

import CardList from '../article-list/article-list'
import Article from '../article/article'
import EditArticle from '../edit-article/edit-article'
import Layout from '../layout/layout'
import Login from '../login/login'
import NewArcticle from '../new-article/new-article'
import RedactProfile from '../redact-profile/redact-profile'
import Registration from '../registration/registration'

const App = () => {
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
          <Route path="new-article" element={<NewArcticle />} />
          <Route path="articles/:slug/edit" element={<EditArticle />} />
        </Route>
      </Routes>
    </>
  )
}

export default memo(App)
