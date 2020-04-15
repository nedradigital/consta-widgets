import { TextBasicEditModeParams } from './Text'

export type LinearChartParams = {
  withZoom?: boolean
  isHorizontal?: boolean
  xLabels?: 'top' | 'bottom'
  xLabelTicks?: number
  xGridTicks?: number
  xGuide?: boolean
  xWithPaddings?: boolean
  yLabels?: 'left' | 'right'
  yLabelTicks?: number
  yGridTicks?: number
  yGuide?: boolean
  yWithPaddings?: boolean
  title?: string
  titleType?: TextBasicEditModeParams['type']
}
