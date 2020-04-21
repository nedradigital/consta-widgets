import React, { RefObject, useState } from 'react'

import { getDayPlural } from '@csssr/gpn-utils/lib/pluralization'
import { IconCalendar, IconChat, Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Direction, Tooltip } from '@/components/Tooltip'
import { ColorGroups } from '@/dashboard'
import { themeColorLight } from '@/utils/theme'
import { daysDiff, formatDate, getEndOfDay, getStartOfDay } from '@/utils/time'
import { Position, useTooltipReposition } from '@/utils/tooltips'

import { Item } from '../..'

import css from './index.css'

type Props = {
  colorGroups: ColorGroups
  direction?: Exclude<Direction, 'upCenter' | 'downCenter' | 'left' | 'right'>
  plan: Item
  fact?: Item
  forecast?: Item
  position: Position
  anchorRef: RefObject<HTMLElement>
  onRequestReposition: () => void
}

const MAX_LENGTH_COMMENT = 280
const CLEAN_COMMENT = 'Комментария нет'

const stopEventHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
  event.stopPropagation()

const getDayText = (start: number, end: number) =>
  getDayPlural(daysDiff(getStartOfDay(start), getEndOfDay(end)))

const DateText: React.FC<{ label: string; startDate: number; endDate: number }> = ({
  label,
  startDate,
  endDate,
}) => (
  <>
    <Text tag="span" size="xs" view="primary">
      <span className={css.label}>{label}: </span>
      {formatDate(startDate)} – {formatDate(endDate)}{' '}
    </Text>
    <Text tag="span" size="xs" view="primary" weight="bold">
      ({getDayText(startDate, endDate)})
    </Text>
  </>
)

const renderDates = ({
  color,
  plan,
  fact,
  forecast,
}: {
  color: string
  plan: Item
  fact?: Item
  forecast?: Item
}) => (
  <>
    <div className={css.dateBlock}>
      <span className={classnames(css.circle, css.isPlan)} style={{ background: color }} />
      <DateText label="План" startDate={plan.startDate} endDate={plan.endDate} />
    </div>
    {fact && (
      <div className={css.dateBlock}>
        <span className={css.circle} style={{ background: color }} />
        <DateText label="Факт" startDate={fact.startDate} endDate={fact.endDate} />
      </div>
    )}
    {forecast && (
      <div className={css.dateBlock}>
        <span className={classnames(css.circle, css.isForecast)} style={{ background: color }} />
        <DateText label="Прогноз" startDate={forecast.startDate} endDate={forecast.endDate} />
      </div>
    )}
  </>
)

const renderComment = (comment: string) => {
  const text = comment.substr(0, MAX_LENGTH_COMMENT)

  return (
    <>
      <Text tag="div" size="xs" transform="uppercase" weight="bold" spacing="xs" view="primary">
        Комментарий:
      </Text>
      <Text tag="span" size="xs" view="primary">
        {text}
        {comment.length > MAX_LENGTH_COMMENT ? '...' : ''}
      </Text>
    </>
  )
}

export const RoadmapTooltip: React.FC<Props> = ({
  fact,
  plan,
  forecast,
  colorGroups,
  direction = 'upRight',
  position,
  anchorRef,
  onRequestReposition,
}) => {
  const [activeSection, changeActiveSection] = useState<'dates' | 'comment'>('dates')

  useTooltipReposition({
    isVisible: true,
    anchorRef,
    onRequestReposition,
  })

  const isActiveDates = activeSection === 'dates'
  const isActiveComment = activeSection === 'comment'
  const { groupName } = plan
  const comment = fact?.comment || forecast?.comment || CLEAN_COMMENT
  const content = [
    <div
      onClick={stopEventHandler}
      key="content"
      className={classnames(css.content, isActiveDates && css.dates)}
    >
      {isActiveComment
        ? renderComment(comment)
        : renderDates({ color: colorGroups[groupName], fact, plan, forecast })}
    </div>,
    <div key="buttons" className={css.buttons}>
      <button
        type="button"
        className={classnames(css.button, css.dates, isActiveDates && css.active)}
        onClick={event => {
          stopEventHandler(event)
          changeActiveSection('dates')
        }}
      >
        <IconCalendar size="s" view="primary" className={css.icon} />
      </button>
      <button
        type="button"
        className={classnames(css.button, css.comment, isActiveComment && css.active)}
        onClick={event => {
          stopEventHandler(event)
          changeActiveSection('comment')
        }}
      >
        <IconChat size="s" view="primary" className={css.icon} />
      </button>
    </div>,
  ] as const

  const renderContent = (contentDirection: Direction) => (
    <div
      className={classnames(
        themeColorLight,
        css.main,
        {
          left: '',
          right: '',
          upLeft: css.upLeft,
          upCenter: '',
          upRight: css.upRight,
          downLeft: css.downLeft,
          downCenter: '',
          downRight: css.downRight,
        }[contentDirection]
      )}
    >
      {content}
    </div>
  )

  return (
    <Tooltip
      direction={direction}
      position={position}
      isVisible
      isContentHoverable
      renderContent={renderContent}
      className={css.tooltip}
      possibleDirections={['downLeft', 'downRight', 'upLeft', 'upRight']}
    />
  )
}
