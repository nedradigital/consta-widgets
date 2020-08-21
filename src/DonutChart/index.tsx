import React from 'react'

import { CoreDonutChart } from '@/_private/components/DonutChart'
import { HalfDonut } from '@/_private/components/DonutChart/components/Donut'
import { Data as DonutTextData } from '@/_private/components/DonutChart/components/Text'
import { Data as DonutData, isHalfDonutVertical } from '@/_private/components/DonutChart/helpers'
import { FormatValue } from '@/_private/types'
import { useBaseSize } from '@/BaseSizeContext'

type Props = {
  data: readonly DonutData[]
  textData?: DonutTextData
  halfDonut?: HalfDonut
  valueSize?: number
  formatValueForTooltip?: FormatValue
}

export const DonutChart: React.FC<Props> = ({ halfDonut, ...rest }) => {
  const { getCalculatedSizeWithBaseSize } = useBaseSize()

  return (
    <CoreDonutChart
      {...rest}
      halfDonut={halfDonut}
      titlePosition={halfDonut === 'bottom' ? 'bottom' : 'top'}
      textPaddingFromBorder={halfDonut ? getCalculatedSizeWithBaseSize(8) : 0}
      showShadow={Boolean(halfDonut)}
      showTitle={Boolean(halfDonut)}
      showSubBlock={isHalfDonutVertical(halfDonut)}
      showTooltip
      showText
    />
  )
}
