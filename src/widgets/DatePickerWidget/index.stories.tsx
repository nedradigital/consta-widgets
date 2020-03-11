import { date as knobsDate, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { DateRange } from '@/components/DatePicker'
import { blockCenteringDecorator } from '@/utils/Storybook'

import { DatePickerWidgetContent, defaultParams } from '.'

const getDateLimitProps = () =>
  ({
    minDate: new Date(knobsDate('minDate', new Date(2019, 0, 1))),
    maxDate: new Date(knobsDate('maxDate', new Date(2020, 3, 2))),
  } as const)

const DatePickerWidgetSingleStory = () => {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <DatePickerWidgetContent
      data={{
        type: 'date',
        value: date,
        onChange: setDate,
        ...getDateLimitProps(),
      }}
      params={object('params', defaultParams)}
    />
  )
}

const DatePickerWidgetRangeStory = () => {
  const [range, setRange] = React.useState<DateRange | undefined>([undefined, undefined])

  return (
    <DatePickerWidgetContent
      data={{
        type: 'date-range',
        value: range,
        onChange: setRange,
        ...getDateLimitProps(),
      }}
      params={object('params', defaultParams)}
    />
  )
}

storiesOf('widgets/DatePickerWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('выбор даты', () => <DatePickerWidgetSingleStory />)
  .add('выбор диапазона дат', () => <DatePickerWidgetRangeStory />)
