import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import CardList from '../article-list/article-list'
import Article from '../article/article'
import Layout from '../layout/layout'

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CardList />} />
          <Route path="articles" element={<CardList />} />
          <Route path="articles/:slug" element={<Article />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
