import { WidgetType } from '@/utils/WidgetFactory'

const req = require.context('../widgets', true, /index.tsx$/)
const widgetsList: { [key: string]: any } = req.keys().reduce((acc, key) => {
  const widgetName = key.replace(/\.\/(.*)\/.*$/, '$1')
  const widgetId = req(key)[widgetName].id

  return {
    ...acc,
    [widgetId]: {
      widgetName,
      ...req(key),
    },
  }
}, {})

export const widgetIds = Object.keys(widgetsList)

export const getWidget = (id: string): WidgetType<any, any> => {
  const name = widgetsList[id].widgetName

  return widgetsList[id][name]
}

export const getWidgetComponentName = (id: string): string => widgetsList[id].widgetName
