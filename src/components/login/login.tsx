/* eslint-disable no-prototype-builtins */
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import styles from '../../scss/registration.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setUserError } from '../../store/reducers/userSlice'
import { looginUser } from '../../store/reducers/actionCreators'

type FormData = {
  mail: string
  pass: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const { error: loginError, user } = useAppSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })
  const navigate = useNavigate()

  useEffect(() => {
    if (user.username) {
      navigate('/articles')
    }
    return () => {
      dispatch(setUserError({}))
    }
  }, [user])

  const onSubmit = (data: FormData) => {
    dispatch(looginUser(data.mail, data.pass))
  }

  const mailValidation = (email: string): boolean => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    return EMAIL_REGEXP.test(email)
  }
  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Sign In</h5>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-area']}>
          <label className={styles.label}>
            Email address
            <input
              className={classNames(styles.input, { [styles['input--invalid']]: errors.mail })}
              type="text"
              placeholder="Email address"
              {...register('mail', {
                required: 'Enter your email address',
                validate: mailValidation,
              })}
            />
            {errors?.mail && (
              <p className={styles['error-message']}>{errors?.mail.message || 'Enter correct email address'}</p>
            )}
          </label>
          <label className={styles.label}>
            Password
            <input
              className={classNames(styles.input, { [styles['input--invalid']]: errors.pass })}
              type="password"
              placeholder="Password"
              {...register('pass', {
                required: 'Enter your password',
                minLength: { value: 6, message: 'Minimum length is 6' },
                maxLength: { value: 40, message: 'Maximum length is 40' },
              })}
            />
            {errors?.pass && <p className={styles['error-message']}>{errors?.pass.message}</p>}
            {!errors?.pass && !errors.mail && loginError?.hasOwnProperty('email or password') && (
              <p className={styles['error-message']}>Email or password {loginError['email or password']}</p>
            )}
          </label>
        </div>
        <button type="submit" className={styles['submit-btn']}>
          Login
        </button>
        <div className={styles.redirect}>
          Don’t have an account?{' '}
          <Link className={styles['redirect-link']} to="/sign-up">
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
