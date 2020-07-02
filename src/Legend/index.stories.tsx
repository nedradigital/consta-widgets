import React from 'react'

import { action } from '@storybook/addon-actions'
import { object, select } from '@storybook/addon-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'
import { labelPositions, labelTypes, sizes } from '@/core/LegendItem'
import { LinearChart } from '@/LinearChart'

import { directions, Legend } from '.'
import { interactiveData, withChart } from './data.mock'

const getCommonProps = () =>
  ({
    direction: select('direction', directions, 'column'),
    labelPosition: select('labelPosition', labelPositions, labelPositions[1]),
    labelType: select('labelType', labelTypes, labelTypes[0]),
    fontSize: select('fontSize', sizes, sizes[1]),
  } as const)

export const Interactive = createStory(
  () => <Legend {...getCommonProps()} data={object('data', interactiveData)} />,
  {
    decorators: [
      environmentDecorator({
        style: {
          width: 200,
        },
      }),
    ],
  }
)

export const WithChart = createStory(
  () => (
    <>
      <div style={{ height: 200, marginBottom: 'var(--space-m)' }}>
        <LinearChart {...withChart.linearChartProps} colorGroups={withChart.colorGroups} />
      </div>
      <div style={{ display: 'inline-block' }}>
        <Legend
          {...getCommonProps()}
          data={object('data', withChart.data)}
          onItemMouseEnter={action('onItemMouseEnter')}
          onItemMouseLeave={action('onItemMouseLeave')}
        />
      </div>
    </>
  ),
  {
    name: 'с графиком',
    decorators: [
      environmentDecorator({
        style: {
          width: 400,
        },
      }),
    ],
  }
)

export default createMetadata({
  title: 'components/Legend',
})
