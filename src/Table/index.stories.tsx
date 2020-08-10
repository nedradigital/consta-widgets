import { updateAt } from '@csssr/gpn-utils/lib/array'
import { Checkbox } from '@gpn-design/uikit/Checkbox'
import { boolean, number, object, text } from '@storybook/addon-knobs'

import { createMetadata, createStory, optionalSelect } from '@/_private/storybook'

import { Props, sizes, Table, TableRow } from './'
import { verticalAligns } from './components/Cell'
import { tableData, tableWithLegendData, tableWithTrafficLightData } from './data.mock'
import { Filters } from './filtering'

const DEFAULT_PARAMETERS = {
  environment: {
    style: {
      width: '90vw',
      height: '400px',
    },
  },
} as const
const FIXED_CONTAINER_SIZE_PARAMETERS = {
  environment: {
    style: {
      width: '500px',
      height: '250px',
    },
  },
}

const defaultProps = {
  columns: tableData.columns,
  rows: tableData.rows,
  filters: tableData.filters,
  borderBetweenColumns: false,
  borderBetweenRows: false,
  isResizable: false,
  isZebraStriped: false,
  stickyColumns: 0,
  stickyHeader: false,
  verticalAlign: undefined,
} as const

const getSizeKnob = () => optionalSelect('size', sizes)
const getFiltersKnob = (filters?: Filters<TableRow>) => {
  const isFilterable = boolean('filterable', true)

  return isFilterable ? filters : undefined
}

const getKnobs = (replacedProps?: Partial<Props<TableRow>>): Props<TableRow> => {
  const props = { ...defaultProps, ...replacedProps }

  return {
    columns: object('columns', props.columns),
    rows: object('rows', props.rows),
    filters: getFiltersKnob(props.filters),
    size: getSizeKnob(),
    borderBetweenColumns: boolean('borderBetweenColumns', props.borderBetweenColumns),
    borderBetweenRows: boolean('borderBetweenRows', props.borderBetweenRows),
    isResizable: boolean('isResizable', props.isResizable),
    isZebraStriped: boolean('isZebraStriped', props.isZebraStriped),
    stickyColumns: number('stickyColumns', props.stickyColumns),
    stickyHeader: boolean('stickyHeader', props.stickyHeader),
    emptyRowsPlaceholder: text('emptyRowsPlaceholder', '') || undefined,
    verticalAlign: optionalSelect('verticalAlign', verticalAligns, props.verticalAlign),
  }
}

export const Interactive = createStory(() => <Table {...getKnobs()} />, {
  name: 'обычная',
  parameters: DEFAULT_PARAMETERS,
})

const WithActiveRowContent = () => {
  const [activeRow, setActiveRow] = React.useState<string>()

  return <Table {...getKnobs()} activeRow={{ id: activeRow, onChange: setActiveRow }} />
}

export const WithActiveRow = createStory(() => <WithActiveRowContent />, {
  name: 'с выбором строки',
  parameters: DEFAULT_PARAMETERS,
})

export const WithStickyHeader = createStory(() => <Table {...getKnobs({ stickyHeader: true })} />, {
  name: 'с зафиксированным заголовком',
  parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
})

export const WithStickyColumn = createStory(() => <Table {...getKnobs({ stickyColumns: 1 })} />, {
  name: 'с зафиксированной колонкой',
  parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
})

export const WithLegend = createStory(
  () => {
    return <Table {...getKnobs(tableWithLegendData)} />
  },
  {
    name: 'с легендой',
    parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
  }
)

export const WithTrafficLight = createStory(
  () => {
    return <Table {...getKnobs(tableWithTrafficLightData)} />
  },
  {
    name: 'со "Светофором"',
    parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
  }
)

const WithCheckboxHeaderContent = () => {
  const ROWS_COUNT = 3
  const [values, setValues] = React.useState<readonly boolean[]>(new Array(ROWS_COUNT).fill(false))
  const toggleRow = (idx: number) => {
    setValues(updateAt(values, idx, !values[idx]))
  }

  const rows = values.map((value, idx) => ({
    id: `row${idx}`,
    checkbox: <Checkbox size="m" checked={value} onChange={() => toggleRow(idx)} />,
    task: `Задача ${idx}`,
  }))
  const areAllSelected = values.every(v => v)

  return (
    <Table
      rows={rows}
      size={getSizeKnob()}
      columns={[
        {
          title: (
            <Checkbox
              size="m"
              checked={areAllSelected}
              onChange={() => setValues(values.map(() => !areAllSelected))}
            />
          ),
          accessor: 'checkbox',
          width: 60,
        },
        {
          title: 'Задача',
          accessor: 'task',
        },
      ]}
    />
  )
}

export const WithCheckboxHeader = createStory(() => <WithCheckboxHeaderContent />, {
  name: 'с чекбоксом в шапке',
  parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
})

export default createMetadata({
  title: 'components/Table',
})
