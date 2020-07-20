import { updateAt } from '@csssr/gpn-utils/lib/array'
import { Checkbox } from '@gpn-design/uikit/Checkbox'
import { boolean, select } from '@storybook/addon-knobs'
import { DecoratorFn } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/common/storybook'

import { Props, sizes, Table, TableRow } from './'
import { tableData, tableWithLegendData, tableWithTrafficLightData } from './data.mock'
import { Filters } from './filtering'

type Decorators = readonly DecoratorFn[]

const DEFAULT_DECORATORS: Decorators = [withSmartKnobs({ ignoreProps: ['size'] })]
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

const getSizeKnob = () => select('size', sizes, 'l')
const getFiltersKnob = <T extends TableRow>(filters?: Filters<T>) => {
  const isFilterable = boolean('filterable', true)

  return isFilterable ? filters : undefined
}
const getTableProps = <T extends TableRow>(tableDataProps: Props<T>) => {
  const { filters, ...restTableData } = tableDataProps

  return {
    ...restTableData,
    filters: getFiltersKnob(filters),
    size: getSizeKnob(),
  }
}

export const Interactive = createStory(() => <Table {...getTableProps(tableData)} />, {
  name: 'обычная',
  decorators: DEFAULT_DECORATORS,
  parameters: DEFAULT_PARAMETERS,
})

const WithActiveRowContent = () => {
  const [activeRow, setActiveRow] = React.useState<string>()

  return (
    <Table {...getTableProps(tableData)} activeRow={{ id: activeRow, onChange: setActiveRow }} />
  )
}

export const WithActiveRow = createStory(() => <WithActiveRowContent />, {
  name: 'с выбором строки',
  parameters: DEFAULT_PARAMETERS,
})

export const WithStickyHeader = createStory(
  () => <Table {...getTableProps(tableData)} stickyHeader />,
  {
    name: 'с зафиксированным заголовком',
    decorators: DEFAULT_DECORATORS,
    parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
  }
)

export const WithStickyColumn = createStory(
  () => <Table {...getTableProps(tableData)} stickyColumns={1} />,
  {
    name: 'с зафиксированной колонкой',
    decorators: DEFAULT_DECORATORS,
    parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
  }
)

export const WithLegend = createStory(
  () => {
    return <Table {...getTableProps(tableWithLegendData)} />
  },
  {
    name: 'с легендой',
    decorators: DEFAULT_DECORATORS,
    parameters: FIXED_CONTAINER_SIZE_PARAMETERS,
  }
)

export const WithTrafficLight = createStory(
  () => {
    return <Table {...getTableProps(tableWithTrafficLightData)} />
  },
  {
    name: 'со "Светофором"',
    decorators: DEFAULT_DECORATORS,
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
