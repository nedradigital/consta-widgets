import React from 'react'

import { classname } from '@/utils/classname'

import { Notice, Props as NoticeProps } from '../Notice'

import './index.css'

const cn = classname('notices')

type Props = {
  className?: string
  notices: NoticeProps[]
}

export const Notices: React.FunctionComponent<Props> = ({ notices, className }) => {
  const noticesCount = notices.length
  const { description, startTime, title } = notices[0]
  const isMultiple = noticesCount > 1

  return (
    <div className={cn(null, null, className)}>
      {isMultiple && <span className={cn('notices-count')}>{noticesCount}</span>}
      <div
        className={cn('notices', {
          'more-one': Boolean(isMultiple),
        })}
      >
        <Notice description={description} startTime={startTime} title={title} />
      </div>
    </div>
  )
}
