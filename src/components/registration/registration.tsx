import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import styles from '../../scss/registration.module.scss'
import { registerUser } from '../../store/reducers/actionCreators'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setUserError } from '../../store/reducers/userSlice'

interface FormData {
  username: string
  mail: string
  pass: string
  passRepeat: string
  agree: boolean
}

const Registration: FC = () => {
  const dispatch = useAppDispatch()
  const { error: registerError } = useAppSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ mode: 'onBlur' })

  useEffect(() => {
    return () => {
      dispatch(setUserError({}))
    }
  }, [])

  const onSubmit = (data: FormData) => {
    dispatch(registerUser(data.username, data.mail, data.pass))
  }

  const mailValidation = (email: string): boolean => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    return EMAIL_REGEXP.test(email)
  }

  const passValidation = (pass: string): boolean => {
    return watch('pass') == pass
  }

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Create new account</h5>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-area']}>
          <label className={styles.label}>
            Username
            <input
              className={classNames(styles.input, { [styles['input--invalid']]: errors.username })}
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Enter your username',
                minLength: { value: 3, message: 'Minimum length is 3' },
                maxLength: { value: 20, message: 'Maximum length is 20' },
              })}
            />
            {errors?.username && <p className={styles['error-message']}>{errors?.username.message}</p>}
            {registerError?.username && !errors?.username && (
              <p className={styles['error-message']}>This username {registerError?.username}</p>
            )}
          </label>
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
            {registerError?.email && !errors?.mail && (
              <p className={styles['error-message']}>This email {registerError?.email}</p>
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
          </label>
          <label className={styles.label}>
            Repeat Password
            <input
              className={classNames(styles.input, { [styles['input--invalid']]: errors.passRepeat })}
              type="password"
              placeholder="Password"
              {...register('passRepeat', {
                required: 'Enter your password',
                validate: passValidation,
              })}
            />
            {errors?.passRepeat && <p className={styles['error-message']}>Passwords must match</p>}
          </label>
          <label className={styles['checkbox-label']}>
            <input
              className={styles.checkbox}
              type="checkbox"
              {...register('agree', {
                required: 'Enter your password',
              })}
            />
            <div>I agree to the processing of my personal information</div>
          </label>
          {errors?.agree && <p className={styles['error-message']}>Agreement is required</p>}
        </div>
        <button type="submit" className={styles['submit-btn']}>
          Create
        </button>
        <div className={styles.redirect}>
          Already have an account?{' '}
          <Link className={styles['redirect-link']} to="/sign-in">
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Registration
