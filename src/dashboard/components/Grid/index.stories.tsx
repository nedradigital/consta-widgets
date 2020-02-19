import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { GridContent, GridItem } from '@/dashboard/types'
import { getUniqueName } from '@/utils/uniq-name-hook'
import { blockCenteringDecorator } from '@/utils/Storybook'
import {
  defaultParams as linearChartWidgetDefaultParams,
  widgetId as linearChartWidgetId,
} from '@/widgets/LinearChartWidget'
import {
  defaultParams as statsWidgetDefaultParams,
  widgetId as statsWidgetId,
} from '@/widgets/StatsWidget'
import { defaultParams as textDefaultParams, widgetId as textWidgetId } from '@/widgets/TextWidget'

import { Grid } from '.'

const gridItem: GridItem = {
  type: 'grid',
  grid: {
    columnParams: [{ growRatio: 1 }, { growRatio: 2 }],
    rowParams: [{}, {}],
    items: [
      // Строка 1
      [
        // Колонка 1
        [
          {
            type: 'widget',
            debugName: 'TitleWidget',
            id: getUniqueName('TitleWidget'),
            widgetType: textWidgetId,
            params: textDefaultParams,
          },
          {
            type: 'widget',
            debugName: 'StatsWidget',
            id: getUniqueName('StatsWidget'),
            widgetType: statsWidgetId,
            params: statsWidgetDefaultParams,
          },
        ],
        // Колонка 2
        [
          {
            type: 'widget',
            debugName: 'StatsWidget',
            id: getUniqueName('StatsWidget'),
            widgetType: statsWidgetId,
            params: statsWidgetDefaultParams,
          },
        ],
      ],
      // Строка 2
      [
        // Колонка 1
        [
          {
            type: 'widget',
            debugName: 'StatsWidget',
            id: getUniqueName('StatsWidget'),
            widgetType: statsWidgetId,
            params: statsWidgetDefaultParams,
          },
        ],
        // Колонка 2
        [
          {
            type: 'widget',
            debugName: 'LinearChartWidget',
            id: getUniqueName('LinearChartWidget'),
            widgetType: linearChartWidgetId,
            params: {
              ...linearChartWidgetDefaultParams,
              growRatio: 1,
            },
          },
        ],
      ],
    ],
  },
  params: {},
}

storiesOf('dashboard/Grid', module)
  .addDecorator(blockCenteringDecorator({ width: 600 }))
  .add('interactive', () => {
    const Wrapper = () => {
      const [config, changeConfig] = React.useState(gridItem)

      const handler = (newGridContent: GridContent) => {
        changeConfig({ ...config, grid: newGridContent })
      }

      return (
        <Grid
          viewMode={boolean('viewMode', false)}
          onChange={handler}
          data={{}}
          datasets={[]}
          {...config}
        />
      )
    }

    return (
      <DndProvider backend={HTML5Backend}>
        <Wrapper />
      </DndProvider>
    )
  })
