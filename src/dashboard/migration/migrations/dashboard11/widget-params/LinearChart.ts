import { XLabelsPosition, YLabelsPosition } from '@/components/LinearChart/components/Axis'

import { TextBasicEditModeParams } from './Text'

export type LinearChartParams = {
  withZoom?: boolean
  isHorizontal?: boolean
  xLabels?: XLabelsPosition
  xLabelTicks?: number
  xGridTicks?: number
  xGuide?: boolean
  xWithPaddings?: boolean
  yLabels?: YLabelsPosition
  yLabelTicks?: number
  yGridTicks?: number
  yGuide?: boolean
  yWithPaddings?: boolean
  title?: string
  titleType?: TextBasicEditModeParams['type']
}
