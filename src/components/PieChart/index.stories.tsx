import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { PieChart } from '.'

storiesOf('components/PieChart', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 300, height: 300 }))
  .add('interactive', () => {
    return (
      <PieChart
        total={70}
        subTotalTitle={'МГРП'}
        subTotal={20}
        data={[
          {
            color: 'red',
            value: 20,
          },
          {
            color: 'blue',
            value: 15,
          },
          {
            color: 'yellow',
            value: 7,
          },
          {
            color: 'purple',
            value: 3,
          },
          {
            color: 'green',
            value: 5,
          },
        ]}
      />
    )
  })
