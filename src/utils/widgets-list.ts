import _ from 'lodash'

import { widgetIdsByType } from '@/migrations/current'
import { WidgetType } from '@/utils/WidgetFactory'

export { widgetIdsByType }

export const widgetIds = Object.values(widgetIdsByType)

export type WidgetId = typeof widgetIds[number]
export type WidgetName = keyof typeof widgetIdsByType

export const getWidgetComponentName = (id: WidgetId) =>
  _.findKey(widgetIdsByType, _.partial(_.isEqual, id)) as WidgetName

export const getWidget = (id: WidgetId): WidgetType<any, any> => {
  const widgetName = getWidgetComponentName(id)

  return require(`../widgets/${widgetName}/index.tsx`)[widgetName]
}
