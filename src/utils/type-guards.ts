/* istanbul ignore file */
import { isDefined } from '@csssr/gpn-utils/lib/type-guards'

import { Position, PositionState } from '@/utils/tooltips'

export const isValidDate = (date: unknown): date is Date =>
  date instanceof Date && !isNaN(date.valueOf())

export const isDefinedPosition = (position: PositionState): position is Position =>
  !!position && isDefined(position.x) && isDefined(position.y)
