import axios from 'axios'
import classNames from 'classnames'
import React, { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../hooks/redux'

import styles from './article-preview.module.scss'

interface AcceptModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  slug: string
}

const AcceptModal: FC<AcceptModalProps> = ({ setOpen, slug }) => {
  const { user } = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  const onDelete = () => {
    const token = `Token ${user.token}`
    const url = `https://blog.kata.academy/api/articles/${slug}`
    axios({ method: 'delete', url, headers: { Authorization: token } }).then(() => {
      navigate('/articles')
    })
  }
  return (
    <div className={styles.modal}>
      <div className={styles['modal-text']}>Are you sure to delete this article?</div>
      <div className={styles['modal-buttons']}>
        <button
          className={classNames(styles['modal-btn'], styles['modal-btn--no'])}
          onClick={() => {
            setOpen(false)
          }}
        >
          No
        </button>
        <button className={classNames(styles['modal-btn'], styles['modal-btn--yes'])} onClick={onDelete}>
          Yes
        </button>
      </div>
    </div>
  )
}

export default memo(AcceptModal)
