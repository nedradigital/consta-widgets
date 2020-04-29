import {
  Constructor,
  DashboardState,
  Data,
  DataMap,
  DataType,
  getAllWidgetAndDatasetIds,
} from '@/dashboard'
import { Consumers, formattersFunctions } from '@/data-layer/components/Consumers'
import { Sources } from '@/data-layer/components/Sources'

import css from './index.css'
import { DataLayer } from './types'

// todo использовать рантайм-типы для таких проверок?
export const isNumberOrNull = (value: DataLayer.DataValue): value is number | null =>
  typeof value === 'number' || value === null

const dataValueToNumberOrNull = (value: DataLayer.DataValue): number | null =>
  isNumberOrNull(value) ? value : null

// Преобразователь данных для линейных графиков
export const getLinearChartData = (
  config: DataLayer.LinearWidgetItem['config'],
  inputs: { table: DataLayer.TableData }
): DataMap[DataType.LinearChart] => {
  const { x, y } = config
  const { table } = inputs

  return {
    data: y.map(yLine => {
      return {
        colorGroupName: yLine.name,
        values: table.map(tableRow => ({
          x: x ? dataValueToNumberOrNull(tableRow[x]) : null,
          y: dataValueToNumberOrNull(tableRow[yLine.field]),
        })),
        lineName: yLine.name,
      }
    }),
    colorGroups: y.reduce<Record<string, string>>((acc, yLine) => {
      acc[yLine.name] = yLine.color
      return acc
    }, {}),
    formatValueForLabel: config.formatX ? formattersFunctions[config.formatX] : undefined,
    formatValueForTooltip: config.formatY ? formattersFunctions[config.formatY] : undefined,
  }
}

export const DataLayerEditor: React.FC<{
  dataLayerConfig: DataLayer.Config
  sourcesList: DataLayer.SourcesList
  sourcesData: DataLayer.SourcesData
  onChange: (newConfig: DataLayer.Config) => void
}> = ({ dataLayerConfig, sourcesList, sourcesData, onChange }) => {
  return (
    <div className={css.main}>
      <div className={css.sources}>
        <Sources
          sourcesList={sourcesList}
          sourcesData={sourcesData}
          config={dataLayerConfig}
          onChangeConfig={onChange}
        />
      </div>
      <div className={css.consumers}>
        <Consumers config={dataLayerConfig} sourcesData={sourcesData} onChangeConfig={onChange} />
      </div>
    </div>
  )
}

export const DashboardWithDataLayer: React.FC<{
  dashboardConfig: DashboardState
  dataLayerConfig: DataLayer.Config
  sourcesData: DataLayer.SourcesData
  viewMode: boolean
  onChange: (state: DashboardState) => void
}> = ({ dashboardConfig, dataLayerConfig, sourcesData, viewMode, onChange }) => {
  const allWidgets = getAllWidgetAndDatasetIds(dashboardConfig.config)
  const data = allWidgets.reduce<Data>((acc, { widgetId }) => {
    const widgetDataLayerConfig = dataLayerConfig.find(
      (item): item is DataLayer.WidgetItem => item.type === 'widget' && item.widgetId === widgetId
    )

    if (widgetDataLayerConfig) {
      // Находим источник для виджета и получаем его данные
      const tableId = widgetDataLayerConfig.inputs.table
      const tableForWidget = dataLayerConfig.find(
        (item): item is DataLayer.SourceItem => item.type === 'table' && item.id === tableId
      )

      if (tableForWidget) {
        const tableFile = sourcesData.find(d => d.file === tableForWidget.file)
        const tableDataForWidget = tableFile && tableFile.tables[tableForWidget.name]

        // Находим нужный конвертер и конвертируем данные в формат виджета
        if (tableDataForWidget) {
          switch (widgetDataLayerConfig.widgetType) {
            case 'LinearChart':
              acc[widgetId] = getLinearChartData(widgetDataLayerConfig.config, {
                table: tableDataForWidget,
              })
              break
          }
        }
      }
    }

    return acc
  }, {})

  return (
    <Constructor
      datasets={[]}
      viewMode={viewMode}
      data={data}
      baseFontSize={16}
      rowsCount={12}
      cols={12}
      dashboard={dashboardConfig}
      onChange={onChange}
      onChangeVersion={() => null}
    />
  )
}
