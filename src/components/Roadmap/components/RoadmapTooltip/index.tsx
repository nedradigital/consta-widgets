import React, { useState } from 'react'

import classnames from 'classnames'
import { reverse } from 'lodash'

import { ColorGroups } from '@/dashboard/types'
import { formatDate } from '@/utils/time'

import { Item } from '../..'

import css from './index.css'

type Props = {
  colorGroups: ColorGroups
  direction?: 'top' | 'bottom'
  plan: Item
  fact: Item
}

const MAX_LENGTH_COMMENT = 280
const CLEAN_COMMENT = 'Комментария нет'

const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()

const renderDates = (color: string, fact: Item, plan: Item) => (
  <>
    <div className={css.dateBlock}>
      <span className={classnames(css.circle, css.transparent)} style={{ background: color }} />
      <span className={css.label}>План:</span>
      {formatDate(plan.startDate)} – {formatDate(plan.endDate)}
    </div>
    <div className={css.dateBlock}>
      <span className={css.circle} style={{ background: color }} />
      <span className={css.label}>Факт:</span>
      {formatDate(fact.startDate)} – {formatDate(fact.endDate)}
    </div>
  </>
)

const renderComment = (comment: string) => {
  const text = comment.substr(0, MAX_LENGTH_COMMENT)

  return (
    <>
      <div className={css.title}>Комментарий:</div>
      {text}
      {comment.length > MAX_LENGTH_COMMENT ? '...' : ''}
    </>
  )
}

export const RoadmapTooltip: React.FC<Props> = ({ fact, plan, colorGroups, direction = 'top' }) => {
  const [activeSection, changeActiveSection] = useState('')
  const isActiveDates = activeSection === 'dates'
  const isActiveComment = activeSection === 'comment'
  const isOpened = isActiveDates || isActiveComment
  const { comment = CLEAN_COMMENT, groupName } = fact
  const content = [
    isOpened ? (
      <div key="content" className={classnames(css.content, isActiveDates && css.dates)}>
        {isActiveComment ? renderComment(comment) : renderDates(colorGroups[groupName], fact, plan)}
      </div>
    ) : null,
    <div key="buttons" className={css.buttons}>
      <div
        className={classnames(css.button, css.dates, isActiveDates && css.active)}
        onClick={() => changeActiveSection('dates')}
      />
      <div
        className={classnames(css.button, css.comment, isActiveComment && css.active)}
        onClick={() => changeActiveSection('comment')}
      />
    </div>,
  ] as const

  return (
    <div className={classnames(css.main, isOpened && css.opened, css[direction])} onClick={onClick}>
      {direction === 'top' ? content : reverse(content)}
    </div>
  )
}
