import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { getArrayWithRandomInt } from '@/utils/array'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { CostGraph } from '.'

const props = {
  title: 'стоимость к продуктивности',
  data: getArrayWithRandomInt(5, 10, 12 * 4),
  unitName: 'руб/ м³ /сут Х атм',
  legendName: 'средневзвешенная',
}

storiesOf('widgets/CostGraph', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => <CostGraph {...props} />)
