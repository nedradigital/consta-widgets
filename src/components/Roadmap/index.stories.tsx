import React from 'react'

import { number, object, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { Roadmap } from '.'

storiesOf('components/Roadmap', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '80vw' }))
  .add('interactive', () => {
    const {
      data: { titles, values, currentDay },
      colorGroups,
    } = getWidgetMockData(DataType.Roadmap)[0]

    return (
      <Roadmap
        data={object('data', values)}
        currentDay={number('currentDay', currentDay)}
        titles={[text('firstColumn', titles[0]), text('secondColumn', titles[1])]}
        colorGroups={object('colorGroups', colorGroups)}
      />
    )
  })
