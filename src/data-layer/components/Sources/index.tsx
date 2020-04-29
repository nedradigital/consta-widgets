import { isTruthy } from '@csssr/gpn-utils/lib/type-guards'
import { Button, IconAdd, IconClose, Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'

import { DataLayer } from '../../types'

import css from './index.css'
import SourceItem = DataLayer.SourceItem

type Props = {
  sourcesList: DataLayer.SourcesList
  sourcesData: DataLayer.SourcesData
  config: DataLayer.Config
  onChangeConfig: (newConfig: DataLayer.Config) => void
}

export const isSourceItem = (item: DataLayer.ConfigItem): item is SourceItem =>
  item.type === 'table' || item.type === 'object'

const SourceNode: React.FC<{
  sourceConfig: SourceItem
  isSelected: boolean
  onClick: () => void
  onDelete: () => void
}> = ({ sourceConfig, isSelected, onClick, onDelete }) => {
  return (
    <div className={css.sourceWrapper}>
      <button
        type="button"
        className={classnames(css.source, isSelected && css.isSelected)}
        onClick={onClick}
      >
        <Text tag="div" view="secondary" size="s">
          {sourceConfig.file}
        </Text>
        <Text tag="span" view="primary" size="s">
          {sourceConfig.type === 'table' ? 'Таблица' : 'Объект'}
        </Text>{' '}
        <Text tag="span" view="primary" size="l">
          «{sourceConfig.name}»
        </Text>
      </button>
      <Button
        type="button"
        className={css.removeSource}
        wpSize="s"
        view="clear"
        iconOnly
        onClick={onDelete}
      >
        <IconClose size="s" />
      </Button>
    </div>
  )
}

export const isTableData = (
  data: DataLayer.TableData | DataLayer.ObjectData
): data is DataLayer.TableData => Array.isArray(data)

const DataPreview: React.FC<{ data?: DataLayer.TableData | DataLayer.ObjectData }> = ({ data }) => {
  if (!data) {
    return null
  }

  if (isTableData(data)) {
    const keys = Object.keys(data[0])

    return (
      <div className={css.preview}>
        Данные таблицы:
        <table>
          <thead>
            <tr>
              {keys.map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {keys.map(key => (
                  <td key={key}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className={css.preview}>
      Данные объекта:
      <table>
        <tbody>
          {Object.keys(data).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const isCompleteSource = (source: Partial<SourceItem>): source is SourceItem =>
  Boolean(source.file && source.name && source.type && source.id)

const AddSource: React.FC<{
  sourcesList: DataLayer.SourcesList
  onSubmit: (newSource: SourceItem) => void
}> = ({ sourcesList, onSubmit }) => {
  const [newSource, setNewSource] = React.useState<Partial<SourceItem>>({})

  const theFile = newSource.file && sourcesList.find(s => s.file === newSource.file)

  React.useEffect(() => {
    setNewSource(state => ({
      ...state,
      id: [state.file, state.type, state.name].filter(isTruthy).join('_'),
    }))
  }, [newSource.file, newSource.name, newSource.type])

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        if (isCompleteSource(newSource)) {
          onSubmit(newSource)
        }
      }}
    >
      <div className={css.addSettings}>
        <WidgetSettingsSelect
          name="Файл"
          value={newSource.file}
          values={sourcesList.map(s => ({
            name: s.file,
            value: s.file,
          }))}
          onChange={file => setNewSource({ file })}
          withEmptyValue
        />

        {theFile && (
          <WidgetSettingsSelect
            name="Тип"
            value={newSource.type}
            values={[
              theFile.tables.length && ({ value: 'table', name: 'Таблица' } as const),
              theFile.objects.length && ({ value: 'object', name: 'Объект' } as const),
            ].filter(isTruthy)}
            onChange={type => setNewSource(state => ({ ...state, type, name: undefined }))}
            withEmptyValue
          />
        )}

        {theFile && newSource.type && (
          <WidgetSettingsSelect
            name="Название"
            value={newSource.name}
            values={theFile[newSource.type === 'table' ? 'tables' : 'objects'].map(sourceName => ({
              value: sourceName,
              name: sourceName,
            }))}
            onChange={name => setNewSource(state => ({ ...state, name }))}
            withEmptyValue
          />
        )}
      </div>

      <Button
        wpSize="s"
        view="primary"
        type="submit"
        width="full"
        disabled={!isCompleteSource(newSource)}
      >
        Добавить
      </Button>
    </form>
  )
}

export function getSourceData(
  sourcesData: DataLayer.SourcesData,
  source: DataLayer.SourceItem<'table'>
): DataLayer.TableData | undefined
export function getSourceData(
  sourcesData: DataLayer.SourcesData,
  source: DataLayer.SourceItem<'object'>
): DataLayer.ObjectData | undefined
export function getSourceData(
  sourcesData: DataLayer.SourcesData,
  source: DataLayer.SourceItem
): DataLayer.SourceData | undefined
export function getSourceData(
  sourcesData: DataLayer.SourcesData,
  source: DataLayer.SourceItem
): DataLayer.SourceData | undefined {
  return sourcesData.find(s => s.file === source.file)?.[
    source.type === 'table' ? 'tables' : 'objects'
  ][source.name]
}

export const Sources: React.FC<Props> = ({ sourcesList, sourcesData, config, onChangeConfig }) => {
  const buttonRef = React.useRef(null)
  const [isAddTooltipOpened, setAddTooltipOpened] = React.useState(false)

  const sources = config.filter(isSourceItem)

  const [selectedSourceId, setSelectedSourceId] = React.useState(sources[0]?.id || null)

  const selectedSource = sources.find(i => i.id === selectedSourceId)
  const selectedData = selectedSource ? getSourceData(sourcesData, selectedSource) : undefined

  return (
    <div className={css.main}>
      <div className={css.header}>
        <Text tag="span" size="2xl">
          Источники
        </Text>
        <div ref={buttonRef}>
          <Button
            wpSize="s"
            view="primary"
            iconOnly
            onClick={() => setAddTooltipOpened(state => !state)}
          >
            <IconAdd size="s" />
          </Button>
          <Tooltip isVisible={isAddTooltipOpened} anchorRef={buttonRef} isContentHoverable>
            <AddSource
              sourcesList={sourcesList}
              onSubmit={newSource => {
                const isSourceAlreadyAdded = config.some(
                  i =>
                    isSourceItem(i) &&
                    i.type === newSource.type &&
                    i.file === newSource.file &&
                    i.name === newSource.name
                )

                if (isSourceAlreadyAdded) {
                  alert('Такой источник уже добавлен')
                } else {
                  onChangeConfig([...config, newSource])
                  setAddTooltipOpened(false)
                }
              }}
            />
          </Tooltip>
        </div>
      </div>

      <div className={css.list}>
        {sources.map(source => (
          <SourceNode
            key={source.id}
            sourceConfig={source}
            isSelected={source.id === selectedSourceId}
            onClick={() => setSelectedSourceId(source.id)}
            onDelete={() =>
              onChangeConfig(config.filter(i => !isSourceItem(i) || i.id !== source.id))
            }
          />
        ))}
      </div>

      <DataPreview data={selectedData} />
    </div>
  )
}
