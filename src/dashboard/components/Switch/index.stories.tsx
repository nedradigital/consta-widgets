import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { boolean, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { SwitchContent, SwitchItem } from '@/dashboard/types'
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

import { Switch } from '.'

const switchItem: SwitchItem = {
  id: 'datasetId',
  type: 'switch',
  displays: [
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
  params: {},
}

storiesOf('dashboard/Switch', module)
  .addDecorator(blockCenteringDecorator({ height: 300, width: 600 }))
  .add('interactive', () => {
    const Wrapper = () => {
      const [config, changeConfig] = React.useState(switchItem)

      const handler = (displays: SwitchContent) => {
        changeConfig({ ...config, displays })
      }

      const viewMode = boolean('viewMode', false)

      return (
        <Switch
          viewMode={viewMode}
          onChange={handler}
          data={{
            datasetId: number('currentDisplay', 1, { min: 1, max: config.displays.length }),
          }}
          datasets={[]}
          dataKey={config.id}
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
