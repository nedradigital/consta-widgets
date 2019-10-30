import React from 'react'

import { number, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { Legend } from '.'

storiesOf('components/Legend', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <div style={{ width: number('wrapper width', 200) }}>
      <Legend
        data={object('data', getWidgetMockData(DataType.Legend).data)}
        colorGroups={object('colorGroups', getWidgetMockData(DataType.Legend).colorGroups)}
        direction="column"
        labelPosition="left"
        labelType="dot"
        fontSize="s"
      />
    </div>
  ))
