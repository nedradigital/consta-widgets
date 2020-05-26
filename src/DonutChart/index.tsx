import { ColorGroups, FormatValue } from '@/common/types'
import { CoreDonutChart } from '@/core/DonutChart'
import { HalfDonut } from '@/core/DonutChart/components/Donut'
import { Data as DonutTextData } from '@/core/DonutChart/components/Text'
import { Data as DonutData, isHalfDonutVertical } from '@/core/DonutChart/helpers'
import { useBaseSize } from '@/BaseSizeContext'

type Props = {
  data: readonly DonutData[]
  colorGroups: ColorGroups
  textData?: DonutTextData
  halfDonut?: HalfDonut
  formatValueForTooltip: FormatValue
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
