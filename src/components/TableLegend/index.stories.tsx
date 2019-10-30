import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { types } from '@/components/LegendItem'
import { DataType } from '@/dashboard'
import { getWidgetMockData } from '@/utils/widget-mock-data'
import { blockCenteringDecorator } from '@/utils/Storybook'
import { defaultParams, TrafficLightWidgetContent } from '@/widgets/TrafficLightWidget'

import { TableLegend } from '.'

storiesOf('components/TableLegend', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <TableLegend
      isShowLegend={false}
      size="l"
      data={object('data', getWidgetMockData(DataType.TableLegend))}
    />
  ))
  .add('with <TrafficLight />', () => (
    <TableLegend
      isShowLegend={false}
      size="l"
      data={{
        colorGroups: {
          first: 'red',
          second: 'yellow',
          third: 'green',
        },
        list: [
          {
            field: 'Северный бур',
            sum: 20,
            status: (
              <TrafficLightWidgetContent params={defaultParams} data={{ status: 'normal' }} />
            ),
          },
          {
            field: 'Южное месторождение',
            sum: 15,
            status: (
              <TrafficLightWidgetContent params={defaultParams} data={{ status: 'warning' }} />
            ),
          },
          {
            field: 'Западный разлом',
            sum: 7,
            status: (
              <TrafficLightWidgetContent params={defaultParams} data={{ status: 'danger' }} />
            ),
          },
        ],
        legendFields: [
          {
            field: 'Северный бур',
            colorGroupName: 'first',
            typeLegend: types[0],
          },
          {
            field: 'Южное месторождение',
            colorGroupName: 'second',
            typeLegend: types[0],
          },
          {
            field: 'Западный разлом',
            colorGroupName: 'third',
            typeLegend: types[0],
          },
        ],
        columnNames: [
          {
            title: 'Локация',
            accessor: 'field',
            className: 'textLeftPosition',
          },
          {
            title: 'Сумма скважин без МГРП',
            accessor: 'sum',
            className: 'textRightPosition',
          },
          {
            title: 'Статус',
            accessor: 'status',
            className: 'textCenterPosition',
          },
        ],
      }}
    />
  ))
