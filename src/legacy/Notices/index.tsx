import React from 'react'

import classnames from 'classnames'

import { Notice, Props as NoticeProps } from '../Notice'

import css from './index.css'

type Props = {
  className?: string
  notices: NoticeProps[]
}

export const Notices: React.FunctionComponent<Props> = ({ notices, className }) => {
  const noticesCount = notices.length
  const { description, startTime, title } = notices[0]
  const isMultiple = noticesCount > 1

  return (
    <div className={classnames(css.notices, className)}>
      {isMultiple && <span className={css.count}>{noticesCount}</span>}
      <div className={classnames(css.list, { [css.multiple]: isMultiple })}>
        <Notice description={description} startTime={startTime} title={title} />
      </div>
    </div>
  )
}
