import { CoreDonutChart } from '@/core/DonutChart'
import { HalfDonut } from '@/core/DonutChart/components/Donut'
import { isHalfDonutHorizontal } from '@/core/DonutChart/helpers'
import { useBaseSize } from '@/BaseSizeContext'
import { getValueRatio } from '@/ProgressBar'

import { DEFAULT_DATA, getData, getMinChartSize, getTextData } from './helpers'

export type Data = {
  value?: number
  valuePlaceholder?: string
  valueMin?: number
  valueMax?: number
}

export type Colors = readonly [string, string, ...(readonly string[])]

type Props = {
  title: string
  data?: Data
  colors: Colors
  showText?: boolean
  showTitle?: boolean
  valueSize?: number
  halfDonut?: HalfDonut
}

const PROGRESS_DONUT_CIRCLES_COUNT = 1

export const ProgressDonut: React.FC<Props> = ({
  title,
  colors,
  showText = false,
  showTitle = false,
  halfDonut,
  ...rest
}) => {
  const { getCalculatedSizeWithBaseSize } = useBaseSize()
  const data = { ...DEFAULT_DATA, ...rest.data }
  const donutTextData = getTextData(title, rest.data)
  const { value, valueMin, valueMax } = data
  const tooltipValue = Math.round(getValueRatio({ value, valueMin, valueMax })) + '%'

  return (
    <CoreDonutChart
      {...rest}
      data={getData({ title, data, halfDonut, colors })}
      textData={donutTextData}
      textPaddingFromBorder={
        isHalfDonutHorizontal(halfDonut) ? getCalculatedSizeWithBaseSize(8) : 0
      }
      titlePosition={halfDonut === 'top' ? 'top' : 'bottom'}
      getCirclesCount={() => PROGRESS_DONUT_CIRCLES_COUNT}
      getMinChartSize={() => getMinChartSize(halfDonut, showText, showTitle)}
      filterTooltipItem={itemData => itemData.name === title}
      formatValueForTooltip={() => tooltipValue}
      halfDonut={halfDonut}
      showShadow={showText && showTitle}
      showText={showText}
      showTitle={showTitle}
      showTooltip={!showText}
      showSubBlock
    />
  )
}
