import React from 'react'

import { boolean, object, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { sizes } from '@/components/TableLegend'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { defaultParams, TableLegendWidget, TableLegendWidgetContent } from '.'

storiesOf('widgets/TableLegendWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TableLegendWidgetContent
      data={object('data', TableLegendWidget.mockData)}
      params={{
        size: select('Высота строки', sizes, defaultParams.size),
        isShowLegend: boolean('Показать легенду', false),
      }}
    />
  ))
