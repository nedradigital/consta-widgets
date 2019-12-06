import { isDefined } from '@gaz/utils/lib/type-guards'

import { DataMap, DataType } from '@/dashboard/types'

/**
 * @return имена невалидных цветовых групп, для которых не задан цвет
 */
export const dataColorsValidator = (
  dataType: DataType,
  widgetData: DataMap[keyof DataMap] | typeof undefined
): readonly string[] => {
  switch (dataType) {
    case DataType.BarChart: {
      const { data, colorGroups } = widgetData as DataMap[DataType.BarChart]
      const colors = Object.keys(colorGroups)

      return data
        .map(item => {
          return item.values
            .map(({ colorGroupName }) => {
              if (!colors.includes(colorGroupName)) {
                return colorGroupName
              }
            })
            .filter(isDefined)
        })
        .flat()
    }

    case DataType.Donut: {
      const { data, colorGroups } = widgetData as DataMap[DataType.Donut]
      const colors = Object.keys(colorGroups)

      return data
        .map(({ colorGroupName }) => {
          if (!colors.includes(colorGroupName)) {
            return colorGroupName
          }
        })
        .filter(isDefined)
    }

    case DataType.Legend: {
      const { data, colorGroups } = widgetData as DataMap[DataType.Legend]
      const colors = Object.keys(colorGroups)

      return data
        .map(({ colorGroupName }) => {
          if (!colors.includes(colorGroupName)) {
            return colorGroupName
          }
        })
        .filter(isDefined)
    }

    case DataType.LinearChart: {
      const { data, colorGroups } = widgetData as DataMap[DataType.LinearChart]
      const colors = Object.keys(colorGroups)

      return data
        .map(({ colorGroupName }) => {
          if (!colors.includes(colorGroupName)) {
            return colorGroupName
          }
        })
        .filter(isDefined)
    }

    case DataType.MultiBarChart: {
      const { data, colorGroups } = widgetData as DataMap[DataType.MultiBarChart]
      const colors = Object.keys(colorGroups)

      return data.categories
        .map(item => {
          if (!colors.includes(item)) {
            return item
          }
        })
        .filter(isDefined)
    }

    case DataType.ProgressBar: {
      const { data, colorGroups } = widgetData as DataMap[DataType.ProgressBar]
      const colors = Object.keys(colorGroups)

      return data
        .map(({ colorGroupName }) => {
          if (!colors.includes(colorGroupName)) {
            return colorGroupName
          }
        })
        .filter(isDefined)
    }

    case DataType.TableLegend: {
      const { legendFields, colorGroups } = widgetData as DataMap[DataType.TableLegend]
      const colors = Object.keys(colorGroups)

      return legendFields
        .map(({ colorGroupName }) => {
          if (!colors.includes(colorGroupName)) {
            return colorGroupName
          }
        })
        .filter(isDefined)
    }

    case DataType.RadarChart: {
      const { colorGroups, figures } = widgetData as DataMap[DataType.RadarChart]

      return figures
        .filter(figure => !colorGroups[figure.colorGroupName])
        .map(figure => figure.colorGroupName)
    }

    default: {
      return []
    }
  }
}
