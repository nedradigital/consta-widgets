import { updateAt } from '@csssr/gpn-utils/lib/array'
import { Checkbox } from '@gpn-design/uikit/Checkbox'
import { DecoratorFn } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, environmentDecorator } from '@/common/storybook'

import { Table } from './'
import { tableData, tableWithLegendData, tableWithTrafficLightData } from './data.mock'

type Decorators = readonly DecoratorFn[]

const DEFAULT_DECORATORS: Decorators = [withSmartKnobs()]
const FIXED_WIDTH_DECORATORS: Decorators = [
  ...DEFAULT_DECORATORS,
  environmentDecorator({
    style: { width: '90vw' },
  }),
]
const STICKY_DECORATORS: Decorators = [
  ...DEFAULT_DECORATORS,
  environmentDecorator({
    style: {
      width: '500px',
      height: '250px',
    },
  }),
]
const WITH_REACT_NODES_DECORATORS: Decorators = [
  withSmartKnobs({ ignoreProps: ['rows'] }),
  environmentDecorator({
    style: {
      width: 500,
    },
  }),
]

export const Interactive = createStory(() => <Table {...tableData} />, {
  name: 'обычная',
  decorators: FIXED_WIDTH_DECORATORS,
})

const WithActiveRowContent = () => {
  const [activeRow, setActiveRow] = React.useState<string>()

  return <Table {...tableData} activeRow={{ id: activeRow, onChange: setActiveRow }} />
}

export const WithActiveRow = createStory(() => <WithActiveRowContent />, {
  name: 'с выбором строки',
  decorators: FIXED_WIDTH_DECORATORS,
})

export const WithStickyHeader = createStory(() => <Table {...tableData} stickyHeader />, {
  name: 'с зафиксированным заголовком',
  decorators: STICKY_DECORATORS,
})

export const WithStickyColumn = createStory(() => <Table {...tableData} stickyColumns={1} />, {
  name: 'с зафиксированной колонкой',
  decorators: STICKY_DECORATORS,
})

export const WithLegend = createStory(
  () => {
    return <Table {...tableWithLegendData} size="l" />
  },
  {
    name: 'с легендой',
    decorators: WITH_REACT_NODES_DECORATORS,
  }
)

export const WithTrafficLight = createStory(
  () => {
    return <Table {...tableWithTrafficLightData} size="l" />
  },
  {
    name: 'со "Светофором"',
    decorators: WITH_REACT_NODES_DECORATORS,
  }
)

const WithCheckboxHeaderContent = () => {
  const ROWS_COUNT = 3
  const [values, setValues] = React.useState<readonly boolean[]>(new Array(ROWS_COUNT).fill(false))
  const toggleRow = (idx: number) => {
    setValues(updateAt(values, idx, !values[idx]))
  }
  const rows = values.map((value, idx) => ({
    id: `row${idx}}`,
    checkbox: <Checkbox size="m" checked={value} onChange={() => toggleRow(idx)} />,
    task: `Задача ${idx}`,
  }))
  const areAllSelected = values.every(v => v)

  return (
    <Table
      rows={rows}
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
  decorators: WITH_REACT_NODES_DECORATORS,
})

export default createMetadata({
  title: 'components/Table',
})
