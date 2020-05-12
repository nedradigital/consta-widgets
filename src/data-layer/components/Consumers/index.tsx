import { move, removeAt, updateAt } from '@csssr/gpn-utils/lib/array'
import { Button, Text } from '@gpn-design/uikit'
import classnames from 'classnames'
import * as _ from 'lodash'

import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { FormatValue } from '@/dashboard'
import { LinearChartWidgetContent } from '@/widgets/LinearChartWidget'

import { getLinearChartData, isNumberOrNull } from '../../'
import { DataLayer } from '../../types'
import { getSourceData, isSourceItem } from '../Sources'

import css from './index.css'

type Props = {
  config: DataLayer.Config
  sourcesData: DataLayer.SourcesData
  onChangeConfig: (newConfig: DataLayer.Config) => void
}

const isWidgetItem = (item: DataLayer.ConfigItem): item is DataLayer.WidgetItem =>
  item.type === 'widget'

const isTableSource = (item: DataLayer.ConfigItem): item is DataLayer.SourceItem<'table'> =>
  item.type === 'table'

const colors = [
  {
    name: 'Синий',
    value: 'var(--color-bg-normal)',
  },
  {
    name: 'Зелёный',
    value: 'var(--color-bg-success)',
  },
  {
    name: 'Жёлтый',
    value: 'var(--color-bg-caution)',
  },
  {
    name: 'Оранжевый',
    value: 'var(--color-bg-warning)',
  },
  {
    name: 'Красный',
    value: 'var(--color-bg-alert)',
  },
] as const

const formattersList = [
  {
    name: 'Месяц',
    value: 'Month',
    groupName: 'Дата', // todo добавить поддержку группировки в селект и упраздить отдельный контрол для датасета
  },
  {
    name: 'Полная дата',
    value: 'Date',
    groupName: 'Дата',
  },
  {
    name: 'Округлить до 2',
    value: 'Round2',
    groupName: 'Число',
  },
] as const

export type FormatterType = typeof formattersList[number]['value']

export const formattersFunctions: Record<FormatterType, FormatValue> = {
  Month: v => new Date(v).toLocaleDateString('ru-RU', { month: 'short' }).substr(0, 3),
  Date: v => {
    const result = new Date(v)
      .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric', day: 'numeric' })
      .replace(' г.', '')

    return result.charAt(0).toUpperCase() + result.slice(1)
  },
  Round2: v => _.round(v, 2).toString(),
}

const WidgetSettings: React.FC<{
  widgetConfig?: DataLayer.WidgetItem
  sources: readonly DataLayer.SourceItem[]
  sourcesData: DataLayer.SourcesData
  onChange: (newConfig: DataLayer.WidgetItem) => void
}> = ({ widgetConfig, sources, sourcesData, onChange }) => {
  if (!widgetConfig) {
    return <div className={css.sidePanel}>Выберите виджет</div>
  }

  const tableId = widgetConfig.inputs.table
  const tableSource = sources.filter(isTableSource).find(s => s.id === tableId)
  const tableData = tableSource ? getSourceData(sourcesData, tableSource) : undefined

  const keys = tableData && tableData.length ? Object.keys(tableData[0]) : []
  const numberOrNullKeys = keys.filter(key => tableData?.every(row => isNumberOrNull(row[key])))

  return (
    <div className={css.sidePanel}>
      <div className={css.settings}>
        <WidgetSettingsSelect
          name="Таблица с данными"
          value={tableId}
          values={sources
            .filter(s => s.type === 'table')
            .map(s => ({
              name: `${s.file}: ${s.name}`,
              value: s.id,
            }))}
          withEmptyValue
          onChange={v =>
            onChange({
              ...widgetConfig,
              inputs: {
                ...widgetConfig.inputs,
                table: v,
              },
            })
          }
        />
        {tableData && (
          <>
            <WidgetSettingsSelect
              name="Значения для оси x"
              value={widgetConfig.config.x}
              values={numberOrNullKeys.map(key => ({
                value: key,
                name: key,
              }))}
              withEmptyValue
              onChange={v =>
                onChange({
                  ...widgetConfig,
                  config: {
                    ...widgetConfig.config,
                    x: v,
                  },
                })
              }
            />

            <WidgetSettingsSelect
              name="Способ форматирования для оси x"
              value={widgetConfig.config.formatX}
              values={formattersList}
              withEmptyValue
              onChange={v =>
                onChange({
                  ...widgetConfig,
                  config: {
                    ...widgetConfig.config,
                    formatX: v,
                  },
                })
              }
            />

            {widgetConfig.config.y.map((yConfig, idx) => {
              const updateYConfigField = <T extends keyof typeof yConfig>(param: T) => (
                value: typeof yConfig[T]
              ): void =>
                onChange({
                  ...widgetConfig,
                  config: {
                    ...widgetConfig.config,
                    y: updateAt(widgetConfig.config.y, idx, {
                      ...yConfig,
                      [param]: value,
                    }),
                  },
                })

              return (
                <React.Fragment key={idx}>
                  <Text tag="div" size="m" weight="bold">
                    Линия №{idx + 1}
                  </Text>
                  <div>
                    <Button
                      wpSize="xs"
                      view="ghost"
                      onClick={() =>
                        onChange({
                          ...widgetConfig,
                          config: {
                            ...widgetConfig.config,
                            y: removeAt(widgetConfig.config.y, idx),
                          },
                        })
                      }
                    >
                      Удалить
                    </Button>

                    {idx > 0 && (
                      <>
                        {' '}
                        <Button
                          wpSize="xs"
                          view="ghost"
                          onClick={() =>
                            onChange({
                              ...widgetConfig,
                              config: {
                                ...widgetConfig.config,
                                y: move(widgetConfig.config.y, idx, idx - 1),
                              },
                            })
                          }
                        >
                          Вверх
                        </Button>
                      </>
                    )}
                  </div>
                  <WidgetSettingsSelect
                    name={'Значения для оси y'}
                    value={yConfig.field}
                    values={numberOrNullKeys.map(key => ({
                      value: key,
                      name: key,
                    }))}
                    withEmptyValue
                    onChange={updateYConfigField('field')}
                  />
                  <WidgetSettingsText
                    name={'Название'}
                    value={yConfig.name}
                    onChange={updateYConfigField('name')}
                  />
                  <WidgetSettingsSelect
                    name={'Цвет'}
                    value={yConfig.color}
                    values={colors}
                    onChange={updateYConfigField('color')}
                    withEmptyValue
                  />
                </React.Fragment>
              )
            })}

            <Button
              wpSize="xs"
              view="ghost"
              onClick={() =>
                onChange({
                  ...widgetConfig,
                  config: {
                    ...widgetConfig.config,
                    y: widgetConfig.config.y.concat([
                      {
                        name: '',
                        color: '',
                        field: '',
                      },
                    ]),
                  },
                })
              }
            >
              Добавить линию
            </Button>

            <WidgetSettingsSelect
              name="Способ форматирования для оси y"
              value={widgetConfig.config.formatY}
              values={formattersList}
              withEmptyValue
              onChange={v =>
                onChange({
                  ...widgetConfig,
                  config: {
                    ...widgetConfig.config,
                    formatY: v,
                  },
                })
              }
            />
          </>
        )}
      </div>
      {tableData && (
        <div className={css.previewPanel}>
          Превью результата:
          <div className={css.preview}>
            {/* todo брать params для превью из конфига дашборда */}
            <LinearChartWidgetContent
              data={getLinearChartData(widgetConfig.config, { table: tableData })}
              params={{
                isHorizontal: true,
                xLabels: 'bottom',
                xLabelTicks: 5,
                xGuide: true,
                yLabels: 'left',
                yLabelTicks: 5,
                yGuide: true,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export const Consumers: React.FC<Props> = ({ config, sourcesData, onChangeConfig }) => {
  const widgetItems = config.filter(isWidgetItem)

  const [selectedWidgetId, setSelectedWidgetId] = React.useState(widgetItems[0]?.widgetId || null)

  const selectedWidget = widgetItems.find(w => w.widgetId === selectedWidgetId)

  const sources = config.filter(isSourceItem)

  return (
    <div className={css.main}>
      <div className={css.header}>
        <Text tag="div" size="2xl">
          Виджеты
        </Text>
      </div>
      <div className={css.content}>
        <div className={css.list}>
          {widgetItems.map(widgetItem => (
            <button
              key={widgetItem.widgetId}
              className={classnames(
                css.item,
                selectedWidgetId === widgetItem.widgetId && css.isSelected
              )}
              type="button"
              onClick={() => setSelectedWidgetId(widgetItem.widgetId)}
            >
              <Text tag="div">{widgetItem.widgetType}</Text>
              <Text tag="div" view="secondary" size="2xs">
                {widgetItem.widgetId}
              </Text>
            </button>
          ))}
        </div>
        <WidgetSettings
          widgetConfig={selectedWidget}
          sources={sources}
          sourcesData={sourcesData}
          onChange={newWidgetConfig => {
            const widgetIdx = config.findIndex(
              i => isWidgetItem(i) && i.widgetId === newWidgetConfig.widgetId
            )

            if (widgetIdx > -1) {
              onChangeConfig(updateAt(config, widgetIdx, newWidgetConfig))
            }
          }}
        />
      </div>
    </div>
  )
}
