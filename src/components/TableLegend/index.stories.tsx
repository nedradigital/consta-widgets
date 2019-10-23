import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

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
      data={object('data', {
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
            color: 'red',
            typeLegend: 'dot',
          },
          {
            field: 'Южное месторождение',
            color: 'yellow',
            typeLegend: 'dot',
          },
          {
            field: 'Западный разлом',
            color: 'green',
            typeLegend: 'dot',
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
      })}
    />
  ))
