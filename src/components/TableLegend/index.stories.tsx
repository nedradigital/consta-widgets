import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { boolean, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { sizes, TableLegend } from '.'

storiesOf('components/TableLegend', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TableLegend
      isShowLegend={boolean('Display legend', false)}
      size={select('size', sizes, sizes[0])}
      data={getWidgetMockData(DataType.TableLegend)}
    />
  ))
