/* eslint-disable no-prototype-builtins */
import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from '../../scss/registration.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { updateUserInfo } from '../../store/reducers/actionCreators'

type FormData = {
  username: string
  email: string
  pass: string
  image: string
}

const RedactProfile: FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })
  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)

  useEffect(() => {
    if (!user.username) {
      navigate('/')
    }
  }, [])

  const onSubmit = (data: FormData) => {
    const formated = Object.fromEntries(Object.entries(data).filter((el) => el[1]))
    const token = `Bearer ${user.token}`
    dispatch(updateUserInfo(formated, token))
  }

  const mailValidation = (email: string): boolean => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    return EMAIL_REGEXP.test(email)
  }

  const urlValidation = (url: string): boolean => {
    if (url == '') return true
    try {
      new window.URL(url)
    } catch (_) {
      return false
    }
    return true
  }

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Edit Profile</h5>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-area']}>
          <label className={styles.label}>
            Username
            <input
              value={username}
              className={classNames(styles.input, { [styles['input--invalid']]: errors.username })}
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Enter your username',
                minLength: { value: 3, message: 'Minimum length is 3' },
                maxLength: { value: 20, message: 'Maximum length is 20' },
              })}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            {errors?.username && <p className={styles['error-message']}>{errors?.username.message}</p>}
          </label>
          <label className={styles.label}>
            Email address
            <input
              value={email}
              className={classNames(styles.input, { [styles['input--invalid']]: errors.email })}
              type="text"
              placeholder="Email address"
              {...register('email', {
                required: 'Enter your email address',
                validate: mailValidation,
              })}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            {errors?.email && (
              <p className={styles['error-message']}>{errors?.email.message || 'Enter correct email address'}</p>
            )}
          </label>
          <label className={styles.label}>
            New password
            <input
              className={classNames(styles.input, { [styles['input--invalid']]: errors.pass })}
              type="password"
              placeholder="New password"
              {...register('pass', {
                minLength: { value: 6, message: 'Minimum length is 6' },
                maxLength: { value: 40, message: 'Maximum length is 40' },
              })}
            />
            {errors?.pass && <p className={styles['error-message']}>{errors?.pass.message}</p>}
          </label>
          <label className={styles.label}>
            Avatar image (url)
            <input
              className={classNames(styles.input, { [styles['input--invalid']]: errors.username })}
              type="text"
              placeholder="Avatar image"
              {...register('image', {
                validate: urlValidation,
              })}
            />
            {errors?.image && <p className={styles['error-message']}>Enter valid image url</p>}
          </label>
        </div>
        <button type="submit" className={styles['submit-btn']}>
          Save
        </button>
      </form>
    </div>
  )
}

export default RedactProfile
