import React from 'react'

import { storiesOf } from '@storybook/react'

import { statuses } from '@/ui/Badge'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { AccumulatedTotal } from '.'

const data = {
  cost: {
    value: -88,
    percent: -2.1,
    status: statuses[0],
  },
  incidents: {
    value: -121.3,
    percent: -16.2,
    status: statuses[1],
  },
  deadlines: {
    value: -217,
    percent: -2.1,
    status: statuses[2],
  },
  time: {
    value: 1.1,
    percent: -1.3,
  },
}

storiesOf('widgets/AccumulatedTotal', module)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <AccumulatedTotal data={data} />)
