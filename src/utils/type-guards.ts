import { BoxItem, ColumnsItem, WidgetItem } from '@/dashboard/types'

export const isWidget = (item: BoxItem): item is WidgetItem => item.type === 'widget'
export const isColumns = (item: BoxItem): item is ColumnsItem => item.type === 'columns'
