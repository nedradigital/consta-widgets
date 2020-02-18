import { BoxItem, GridItem, WidgetItem } from '@/dashboard/types'

export const isWidget = (item: BoxItem): item is WidgetItem => item.type === 'widget'
export const isGrid = (item: BoxItem): item is GridItem => item.type === 'grid'
export const isValidDate = (date: unknown): date is Date =>
  date instanceof Date && !isNaN(date.valueOf())
