import React from 'react'

import { boolean, object } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'

import { TableLegend } from '.'
import {
  convertListItemToTableRow,
  tableLegendData,
  tableLegendWithTrafficLightData,
} from './data.mock'

const decorators = [
  withSmartKnobs(),
  environmentDecorator({
    style: {
      width: '90vw',
    },
  }),
] as const

export const Interactive = createStory(
  () => (
    <TableLegend
      isShowLegend={boolean('isShowLegend', false)}
      size="l"
      data={object('data', tableLegendData)}
    />
  ),
  {
    name: 'обычная',
    decorators,
  }
)

export const TableLegendWithSelectedRow = createStory(
  () => {
    const [activeRowId, setActiveRowId] = React.useState<string | undefined>()
    const data = object('data', tableLegendData)

    return (
      <TableLegend
        isShowLegend={false}
        size="l"
        data={{
          ...data,
          activeRow: {
            id: activeRowId,
            onChange: setActiveRowId,
          },
        }}
      />
    )
  },
  { name: 'c возможностью выбора активной строки', decorators }
)

export const WithTrafficLight = createStory(
  () => {
    const { list, ...data } = object('data', tableLegendWithTrafficLightData)

    return (
      <TableLegend
        isShowLegend={false}
        size="l"
        data={{
          ...data,
          list: list.map(convertListItemToTableRow),
        }}
      />
    )
  },
  {
    name: 'со "Светофором"',
    decorators: [
      withSmartKnobs(),
      environmentDecorator({
        style: {
          width: 500,
        },
      }),
    ],
  }
)

export default createMetadata({
  title: 'components/TableLegend',
})
