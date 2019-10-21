import * as _ from 'lodash'

import { LinearChart } from '@/legacy/LinearChart'
import { Text } from '@/ui/Text'
import { getAverageWeightedPercent } from '@/utils/math'

import css from './index.css'

type Params = {
  title: string
}

type Data = {
  values: readonly number[]
  from: number
  to: number
}

type Props = {
  params: Params
  data: Data
}

export const VerticalGraph: React.FC<Props> = ({
  params: { title },
  data: { values, from, to },
}) => {
  const averagePercent = getAverageWeightedPercent(values)
  const averageValue = from + (averagePercent / 100) * (to - from)

  return (
    <div className={css.main}>
      <Text size={'s'} className={css.title}>
        {title}
      </Text>

      <div className={css.chart}>
        <div className={css.scale} />
        <LinearChart
          orientation="vertical"
          chartDirection="down-left"
          lines={[
            {
              values,
              background: {
                start: 'rgba(41, 176, 255, 0.4)',
                end: 'rgba(86, 185, 242, 0)',
              },
              valueRange: [0, Math.max(...values)],
            },
          ]}
        />
        <div
          className={css.average}
          style={{
            top: `${averagePercent}%`,
          }}
        >
          <svg className={css.arrow} viewBox="0 0 10 10" preserveAspectRatio="none">
            <polygon points="0,0 10,5 0,10" fill="currentColor" />
          </svg>
          <div className={css.averageText}>
            <div className={css.averageName}>медианное</div>
            <Text size="3xl" className={css.averageValue}>
              {_.round(averageValue)} м
            </Text>
          </div>
        </div>
        <div className={css.from}>min {from}</div>
        <div className={css.to}>max {to}</div>
      </div>
    </div>
  )
}
