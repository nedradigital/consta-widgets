import React from 'react'

import { Text } from '@gpn-design/uikit/Text'

import { getMonths } from '../../helpers'

import css from './index.css'

export const MonthsTitles: React.FC<{
  startDate: number
  endDate: number
  firstMonthRef: React.RefObject<HTMLDivElement>
}> = ({ startDate, endDate, firstMonthRef }) => {
  const titles = getMonths(startDate, endDate).map((month, index) => (
    <div key={index} ref={index === 0 ? firstMonthRef : undefined} className={css.title}>
      {month.period ? (
        <div className={css.period}>
          <Text className={css.periodText} lineHeight="s" spacing="xs" weight="regular">
            {month.period} {month.year}
          </Text>
        </div>
      ) : null}
      <Text size="xs" spacing="xs" transform="uppercase" weight="bold">
        {month.value}
      </Text>
    </div>
  ))

  return <div className={css.main}>{titles}</div>
}
