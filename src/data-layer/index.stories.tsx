import React from 'react'

import { ChoiceGroup } from '@gpn-design/uikit'
import { storiesOf } from '@storybook/react'

import {
  DashboardState,
  EMPTY_DASHBOARD,
  getAllWidgetAndDatasetIds,
  SUPPORTED_DASHBOARD_VERSION,
} from '@/dashboard'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { DashboardWithDataLayer, DataLayerEditor } from '.'
import { DataLayer } from './types'

/* eslint-disable camelcase */

export const exampleSourcesList: DataLayer.SourcesList = [
  {
    file: 'Безопасность.xls',
    tables: ['AAR', 'LTIF'],
    objects: ['AAR'],
  },
]

export const exampleSourcesData: DataLayer.SourcesData = [
  {
    file: 'Безопасность.xls',
    tables: {
      AAR: [
        {
          Месяц: 1585688400000, // Апрель
          Текущий_год: 0.34688,
          Предыдущий_год: 0.41,
          Позапрошлый_год: 0.58,
          Комментарий: 'Данные за апрель',
        },
        {
          Месяц: 1588280400000, // Май
          Текущий_год: 0.4,
          Предыдущий_год: 0.80949,
          Позапрошлый_год: 0.3221,
          Комментарий: 'Данные за май',
        },
        {
          Месяц: 1590958800000, // Июнь
          Текущий_год: null,
          Предыдущий_год: 0.67722,
          Позапрошлый_год: 0.7432,
          Комментарий: 'Данные за июнь',
        },
      ],
      LTIF: [
        {
          Месяц: 1585688400000,
          Текущий_год: 0.38803,
          Предыдущий_год: 0.57,
        },
        {
          Месяц: 1588280400000,
          Текущий_год: 0.57,
          Предыдущий_год: 0.38803,
        },
      ],
    },
    objects: {
      AAR: {
        Порог: 50,
      },
    },
  },
]

export const exampleDataLayerConfig: DataLayer.Config = [
  // Источники данных
  {
    type: 'table',
    file: 'Безопасность.xls',
    name: 'AAR',
    id: 'tableAar',
  },
  {
    type: 'table',
    file: 'Безопасность.xls',
    name: 'LTIF',
    id: 'tableLtif',
  },
  // Потребители данных
  {
    type: 'widget',
    widgetType: 'LinearChart',
    widgetId: 'e63c468b-75bd-4c5c-95c7-696e598db6e3_0',
    inputs: {
      table: 'tableAar',
    },
    config: {
      x: 'Месяц',
      y: [
        {
          field: 'Текущий_год',
          name: 'Текущий год',
          color: '#56B9F2',
        },
        {
          field: 'Предыдущий_год',
          name: 'Прошлый год',
          color: '#20B55F',
        },
      ],
    },
  },
  {
    type: 'widget',
    widgetType: 'LinearChart',
    widgetId: 'e63c468b-75bd-4c5c-95c7-696e598db6e3_1',
    inputs: {
      table: undefined,
    },
    config: {
      x: undefined,
      y: [],
    },
  },
]

export const exampleEmptyDataLayerConfig: DataLayer.Config = [
  {
    type: 'widget',
    widgetType: 'LinearChart',
    widgetId: 'e63c468b-75bd-4c5c-95c7-696e598db6e3_0',
    inputs: {
      table: undefined,
    },
    config: {
      y: [],
    },
  },
  {
    type: 'widget',
    widgetType: 'LinearChart',
    widgetId: 'e63c468b-75bd-4c5c-95c7-696e598db6e3_1',
    inputs: {
      table: undefined,
    },
    config: {
      y: [],
    },
  },
]

const exampleDashboardConfig: DashboardState = {
  boxes: [{ w: 6, h: 3, x: 0, y: 0, i: 'Box_0', moved: false, static: false }],
  config: {
    Box_0: [
      {
        type: 'widget',
        debugName: 'Линейный график 1',
        id: 'e63c468b-75bd-4c5c-95c7-696e598db6e3_0',
        widgetType: 'e63c468b-75bd-4c5c-95c7-696e598db6e3',
        params: {
          isHorizontal: true,
          xLabels: 'bottom',
          xLabelTicks: 5,
          xGuide: true,
          yLabels: 'left',
          yLabelTicks: 5,
          yGuide: true,
          growRatio: 1,
        },
      },
      {
        type: 'widget',
        debugName: 'Линейный график 2',
        id: 'e63c468b-75bd-4c5c-95c7-696e598db6e3_1',
        widgetType: 'e63c468b-75bd-4c5c-95c7-696e598db6e3',
        params: {
          isHorizontal: true,
          xLabels: 'bottom',
          xLabelTicks: 5,
          xGuide: true,
          yLabels: 'left',
          yLabelTicks: 5,
          yGuide: true,
          growRatio: 1,
        },
      },
    ],
  },
  settings: {},
  version: SUPPORTED_DASHBOARD_VERSION,
}

const DataLayerEditorFilledStory = () => {
  const [config, setConfig] = React.useState<DataLayer.Config>(exampleDataLayerConfig)

  return (
    <DataLayerEditor
      dataLayerConfig={config}
      sourcesList={exampleSourcesList}
      sourcesData={exampleSourcesData}
      onChange={setConfig}
    />
  )
}

const DataLayerEditorEmptyStory = () => {
  const [config, setConfig] = React.useState<DataLayer.Config>(exampleEmptyDataLayerConfig)

  return (
    <DataLayerEditor
      dataLayerConfig={config}
      sourcesList={exampleSourcesList}
      sourcesData={exampleSourcesData}
      onChange={setConfig}
    />
  )
}

const DataLayerComboStory = () => {
  const [dataLayerConfig, setDataLayerConfig] = React.useState<DataLayer.Config>([])
  const [dashboard, setDashboard] = React.useState<DashboardState>(EMPTY_DASHBOARD)
  const [currentView, setCurrentView] = React.useState<'constructor' | 'data-layer' | 'result'>(
    'constructor'
  )

  React.useEffect(() => {
    const newWidgetIds = getAllWidgetAndDatasetIds(dashboard.config)
      .map(({ widgetId }) => widgetId)
      .filter(id => !dataLayerConfig.some(i => i.type === 'widget' && i.widgetId === id))

    if (newWidgetIds.length) {
      setDataLayerConfig(state => [
        ...state,
        // todo нужно определять тип виджета
        ...newWidgetIds.map(
          (id): DataLayer.WidgetItem => ({
            type: 'widget',
            widgetId: id,
            widgetType: 'LinearChart',
            inputs: {},
            config: {
              y: [],
            },
          })
        ),
      ])
    }
  }, [dashboard, dataLayerConfig])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ margin: '24px auto' }}>
        <ChoiceGroup
          items={[
            {
              label: 'Конструктор дашборда',
              value: 'constructor',
            } as const,
            {
              label: 'Редактирование данных',
              value: 'data-layer',
            } as const,
            {
              label: 'Результат',
              value: 'result',
            } as const,
          ]}
          value={currentView}
          wpSize="l"
          isMultiple={false}
          onChange={newView => newView && setCurrentView(newView)}
        />
      </div>

      <div
        style={{
          width: '100%',
          flexGrow: 1,
        }}
      >
        {currentView === 'data-layer' ? (
          <DataLayerEditor
            dataLayerConfig={dataLayerConfig}
            sourcesList={exampleSourcesList}
            sourcesData={exampleSourcesData}
            onChange={setDataLayerConfig}
          />
        ) : (
          <DashboardWithDataLayer
            dashboardConfig={dashboard}
            dataLayerConfig={dataLayerConfig}
            sourcesData={exampleSourcesData}
            viewMode={currentView === 'result'}
            onChange={setDashboard}
          />
        )}
      </div>
    </div>
  )
}

storiesOf('data-layer', module)
  .addDecorator(blockCenteringDecorator({ width: '100%', height: '100vh' }))
  .add('редактор с данными', () => <DataLayerEditorFilledStory />)
  .add('редактор пустой', () => <DataLayerEditorEmptyStory />)
  .add('дашборд с данными из даталэера', () => (
    <DashboardWithDataLayer
      dashboardConfig={exampleDashboardConfig}
      dataLayerConfig={exampleDataLayerConfig}
      sourcesData={exampleSourcesData}
      viewMode
      onChange={() => null}
    />
  ))
  .add('конструктор дашбордов + редактор даталэера = дашборд с данными', () => (
    <DataLayerComboStory />
  ))
