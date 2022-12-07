import axios from 'axios'
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'

import { useAppSelector } from '../../hooks/redux'
import styles from '../../scss/registration.module.scss'
import Loader from '../loader/loader'

import ownStyles from './new-article.module.scss'
import Tag from './tag'

interface FormData {
  title: string
  description: string
  body: string
}

interface Tag {
  name: string
  id: string
}

const NewArcticle: FC = () => {
  const { currentArticle, loading } = useAppSelector((state) => state.articles)
  const { user } = useAppSelector((state) => state.user)
  const [tags, setTags] = useState<Tag[]>([])
  const [tagsInput, setTagsInput] = useState<string>('')
  const [titleInput, setTitleInput] = useState<string>('')
  const [descriptionInput, setDescriptionInput] = useState<string>('')
  const [bodyInput, setBodyInput] = useState<string>('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: 'onBlur' })

  const addTag = (name: string) => {
    const tag = { name, id: v4() }
    setTagsInput('')
    setTags((tags) => {
      return [...tags, tag]
    })
  }

  const deleteTag = (id: string) => {
    setTags((tags) => {
      const i = tags.findIndex((el) => el.id === id)
      return [...tags.slice(0, i), ...tags.slice(i + 1)]
    })
  }

  useEffect(() => {
    if (currentArticle) {
      setTitleInput(currentArticle.title)
      setDescriptionInput(currentArticle.description)
      setBodyInput(currentArticle.body)
      currentArticle.tagList.map((el) => {
        addTag(String(el))
      })
      reset({ title: titleInput, body: bodyInput, description: descriptionInput })
    }
  }, [currentArticle])

  const onSubmit = (data: FormData) => {
    const url = currentArticle ? `articles/${currentArticle.slug}` : 'articles'
    const method = currentArticle ? 'put' : 'post'
    const token = `Token ${user.token}`
    const tagNames = tags.map((el) => el.name)
    const formated = {
      ...data,
      tagList: tagNames,
    }

    axios({
      method,
      baseURL: 'https://blog.kata.academy/api/',
      url,
      headers: { Authorization: token },
      data: {
        article: formated,
      },
    }).then(
      (data) => {
        const slug = data.data.article.slug
        navigate(`/articles/${slug}`)
      },
      (err) => {
        console.log(err.message)
      }
    )
  }

  const form = (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['input-area']}>
        <label className={classNames(styles.label, ownStyles.label)}>
          Title
          <input
            value={titleInput}
            className={classNames(styles.input, { [styles['input--invalid']]: errors.title })}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          {errors?.title && <p className={styles['error-message']}>{errors?.title.message}</p>}
        </label>
        <label className={classNames(styles.label, ownStyles.label)}>
          Short description
          <input
            value={descriptionInput}
            className={classNames(styles.input, { [styles['input--invalid']]: errors.description })}
            type="text"
            placeholder="Title"
            {...register('description', {
              required: 'Short description is required',
            })}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          {errors?.description && <p className={styles['error-message']}>{errors?.description.message}</p>}
        </label>
        <label className={classNames(styles.label, ownStyles.label)}>
          Text
          <textarea
            value={bodyInput}
            className={classNames(styles.input, ownStyles.textarea, { [styles['input--invalid']]: errors.body })}
            placeholder="Text"
            {...register('body', {
              required: 'Text is required',
            })}
            onChange={(e) => setBodyInput(e.target.value)}
          />
          {errors?.body && <p className={styles['error-message']}>{errors?.body.message}</p>}
        </label>
        <div className={classNames(styles.label, ownStyles.label)}>
          Tags
          <ul>
            {tags.map((el) => {
              return <Tag data={el} key={el.id} deleteTag={deleteTag} />
            })}
          </ul>
          <div>
            <input
              value={tagsInput}
              className={classNames(styles.input, ownStyles['tag-name'])}
              type="text"
              placeholder="Tag"
              onChange={(e) => setTagsInput(e.target.value)}
            />
            <button
              type="button"
              className={classNames(ownStyles.btn, ownStyles['btn--delete'])}
              onClick={() => {
                const el = tags[tags.length - 1].id
                deleteTag(el)
              }}
            >
              Delete
            </button>
            <button
              className={classNames(ownStyles.btn, ownStyles['btn--add'])}
              type="button"
              onClick={() => addTag(tagsInput)}
            >
              Add tag
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className={classNames(styles['submit-btn'], ownStyles.submit)}>
        Send
      </button>
    </form>
  )

  const title = loading || currentArticle !== null ? 'Edit article' : 'Create new article'

  return (
    <div className={classNames(styles.wrapper, ownStyles.wrapper)}>
      <h5 className={styles.title}>{title}</h5>
      {loading && <Loader />}
      {!loading && form}
    </div>
  )
}

export default NewArcticle
