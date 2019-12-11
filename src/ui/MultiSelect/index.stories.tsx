import React from 'react'

import { object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { MultiSelect, Option, Props } from '.'

type Values = Props['values']

const fewOptions: readonly Option[] = [
  { id: 'condition1', name: 'Условие 1' },
  { id: 'condition2', name: 'Условие 2' },
  { id: 'condition3', name: 'Условие 3' },
]

const fewOptionsValues = ['condition1', 'condition3'] as Props['values']

const manyOptions: readonly Option[] = [
  { id: 'condition1', name: 'Условие 1' },
  { id: 'condition2', name: 'Условие 2' },
  { id: 'condition3', name: 'Условие 3' },
  { id: 'condition4', name: 'Условие 4' },
  { id: 'condition5', name: 'Условие 5' },
  { id: 'condition6', name: 'Условие 6' },
  { id: 'condition7', name: 'Условие 7' },
  { id: 'condition8', name: 'Условие 8' },
  { id: 'condition9', name: 'Условие 9' },
]

storiesOf('ui/MultiSelect', module)
  .addDecorator(withSmartKnobs({ ignoreProps: ['values'] }))
  .addDecorator(blockCenteringDecorator())
  .add('обычный', () => {
    const [values, setValues] = React.useState<Values>([])

    return (
      <MultiSelect options={object('options', fewOptions)} values={values} onChange={setValues} />
    )
  })
  .add('с уже заданными значениями', () => {
    const [values, setValues] = React.useState<Values>(fewOptionsValues)

    return (
      <MultiSelect options={object('options', fewOptions)} values={values} onChange={setValues} />
    )
  })
  .add('с большим количеством опций', () => {
    const [values, setValues] = React.useState<Values>([])

    return (
      <MultiSelect options={object('options', manyOptions)} values={values} onChange={setValues} />
    )
  })
