import { isDefined } from '@csssr/gpn-utils/lib/type-guards'

import { BoxItem, GridItem, WidgetItem } from '@/dashboard/types'
import { Position, PositionState } from '@/utils/tooltips'

export const isWidget = (item: BoxItem): item is WidgetItem => item.type === 'widget'
export const isGrid = (item: BoxItem): item is GridItem => item.type === 'grid'
export const isValidDate = (date: unknown): date is Date =>
  date instanceof Date && !isNaN(date.valueOf())

export const isDefinedPosition = (position: PositionState): position is Position =>
  !!position && isDefined(position.x) && isDefined(position.y)
