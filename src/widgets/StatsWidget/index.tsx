import * as React from 'react'

import { Stats } from '@/components/Stats'
import { Size, sizes } from '@/components/Stats'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { DataMap, DataType } from '@/dashboard/types'
import { Status, statuses } from '@/ui/Badge'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

const dataType = DataType.Stats
type Data = DataMap[typeof dataType]

const widgetId = '506fa3ba-e016-4b94-9ad3-547f7e70c464'

export const topTypes = ['label', 'sublabel'] as const
export type TopTypes = typeof topTypes[number]

export const positionNames = ['right', 'bottom'] as const
export type PositionNames = typeof positionNames[number]

type Params = {
  badgePosition: PositionNames
  topStyles: TopTypes
  size: Size
  top: string
  statusBadge: Status
}

export const defaultParams: Params = {
  badgePosition: 'right',
  topStyles: 'label',
  size: 'xs',
  top: 'сроки',
  statusBadge: 'normal',
}

export const StatsWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { badgePosition, topStyles, size, top, statusBadge },
}) => {
  const { percent, bottomUnit, rightUnit } = data
  const rightValue = percent && badgePosition === 'right' ? percent : rightUnit
  const bottomValue = percent && badgePosition === 'bottom' ? percent : bottomUnit

  return (
    <Stats
      size={size}
      top={top}
      topSublabel={topStyles === 'sublabel'}
      right={rightValue}
      rightBadge={badgePosition === 'right'}
      bottom={bottomValue}
      bottomBadge={badgePosition === 'bottom'}
      statusBadge={statusBadge}
      number={data.number}
    />
  )
}

export const StatsWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Статы',
  defaultParams,
  dataType,
  Content: StatsWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsSelect
          name="Размер"
          value={params.size}
          onChange={value => onChangeParam('size', value)}
          values={sizes.map(i => ({ value: i, name: i }))}
        />
        <WidgetSettingsText
          name="Текст верхней строки"
          value={params.top}
          onChange={value => onChangeParam('top', value)}
        />
        <WidgetSettingsSelect
          name="Вверхняя строка подзаголовок?"
          value={params.topStyles}
          onChange={value => onChangeParam('topStyles', value)}
          values={topTypes.map(i => ({ value: i, name: i }))}
        />
        <WidgetSettingsSelect
          name="Позиция Badge"
          value={params.badgePosition}
          onChange={value => onChangeParam('badgePosition', value)}
          values={positionNames.map(i => ({ value: i, name: i }))}
        />
        <WidgetSettingsSelect
          name="Статус Badge"
          value={params.statusBadge}
          onChange={value => onChangeParam('statusBadge', value)}
          values={statuses.map(i => ({ value: i, name: i }))}
        />
      </>
    )
  },
})
