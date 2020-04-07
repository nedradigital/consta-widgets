import { BoxItemMarginSize } from '@/dashboard'
import { fontSizeValues, marginSizeValues } from '@/dashboard/size-constants'
import { TextSize } from '@/utils/ui-kit'

export const getFormattedMarginName = (value: BoxItemMarginSize) =>
  `${value} (${marginSizeValues[value]})`

export const getFormattedFontSizeName = ({ value, name }: { value: TextSize; name?: string }) =>
  `${name || value} (${fontSizeValues[value]})`
