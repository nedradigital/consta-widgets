import { updateAt } from '@csssr/gpn-utils/lib/array'
import { Checkbox } from '@gpn-design/uikit/Checkbox'
import { select } from '@storybook/addon-knobs'
import { DecoratorFn } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory } from '@/common/storybook'

import { sizes, Table } from './'
import { tableData, tableWithLegendData, tableWithTrafficLightData } from './data.mock'

type Decorators = readonly DecoratorFn[]

const DEFAULT_DECORATORS: Decorators = [withSmartKnobs({ ignoreProps: ['size'] })]
const FIXED_WIDTH_PARAMETERS = {
  environment: {
    style: { width: '90vw' },
  },
} as const
const STICKY_PARAMETERS = {
  environment: {
    style: {
      width: '500px',
      height: '250px',
    },
  },
}
const WITH_REACT_NODES_PARAMETERS = {
  environment: {
    style: {
      width: 500,
    },
  },
} as const

const getSizeKnob = () => select('size', sizes, 'l')

export const Interactive = createStory(() => <Table {...tableData} size={getSizeKnob()} />, {
  name: 'обычная',
  decorators: DEFAULT_DECORATORS,
  parameters: FIXED_WIDTH_PARAMETERS,
})

const WithActiveRowContent = () => {
  const [activeRow, setActiveRow] = React.useState<string>()

  return (
    <Table
      {...tableData}
      size={getSizeKnob()}
      activeRow={{ id: activeRow, onChange: setActiveRow }}
    />
  )
}

export const WithActiveRow = createStory(() => <WithActiveRowContent />, {
  name: 'с выбором строки',
  decorators: DEFAULT_DECORATORS,
  parameters: FIXED_WIDTH_PARAMETERS,
})

export const WithStickyHeader = createStory(
  () => <Table {...tableData} size={getSizeKnob()} stickyHeader />,
  {
    name: 'с зафиксированным заголовком',
    decorators: DEFAULT_DECORATORS,
    parameters: STICKY_PARAMETERS,
  }
)

export const WithStickyColumn = createStory(
  () => <Table {...tableData} size={getSizeKnob()} stickyColumns={1} />,
  {
    name: 'с зафиксированной колонкой',
    decorators: DEFAULT_DECORATORS,
    parameters: STICKY_PARAMETERS,
  }
)

export const WithLegend = createStory(
  () => {
    return <Table {...tableWithLegendData} size={getSizeKnob()} />
  },
  {
    name: 'с легендой',
    decorators: DEFAULT_DECORATORS,
    parameters: WITH_REACT_NODES_PARAMETERS,
  }
)

export const WithTrafficLight = createStory(
  () => {
    return <Table {...tableWithTrafficLightData} size={getSizeKnob()} />
  },
  {
    name: 'со "Светофором"',
    decorators: DEFAULT_DECORATORS,
    parameters: WITH_REACT_NODES_PARAMETERS,
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
  parameters: WITH_REACT_NODES_PARAMETERS,
})

export default createMetadata({
  title: 'components/Table',
})
