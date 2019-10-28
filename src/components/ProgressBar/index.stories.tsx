import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { ProgressBar } from './'

storiesOf('components/ProgressBar', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: 300, height: 300 }))
  .add('interactive', () => <ProgressBar size="m" data={getWidgetMockData(DataType.ProgressBar)} />)
