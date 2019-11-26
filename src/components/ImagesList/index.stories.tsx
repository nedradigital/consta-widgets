import React from 'react'

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { ImagesList } from '.'

storiesOf('components/ImagesList', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator({ width: '20vw' }))
  .add('interactive', () => (
    <ImagesList images={getWidgetMockData(DataType.Images)} onClick={action('onClick')} />
  ))
