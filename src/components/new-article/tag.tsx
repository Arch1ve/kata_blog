import classNames from 'classnames'
import React, { FC, memo } from 'react'

import outerStyles from '../../scss/registration.module.scss'

import styles from './new-article.module.scss'

interface DeleteTagFunction {
  (id: string): void
}

interface TagProps {
  data: {
    name: string
    id: string
  }
  deleteTag: DeleteTagFunction
}

const Tag: FC<TagProps> = ({ data, deleteTag }) => {
  const { name, id } = data
  return (
    <li className={styles.tag}>
      <span className={classNames(outerStyles.input, styles['tag-name'])}>{name}</span>
      <button
        type="button"
        onClick={() => {
          deleteTag(id)
        }}
        className={classNames(styles.btn, styles['btn--delete'])}
      >
        Delete
      </button>
    </li>
  )
}

export default memo(Tag)
