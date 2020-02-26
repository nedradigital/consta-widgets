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

storiesOf('widgets/DatePickerWidget', module)
  .addDecorator(blockCenteringDecorator())
  .add('выбор даты', () => {
    const Wrapper = () => {
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

    return <Wrapper />
  })
  .add('выбор диапазона дат', () => {
    const Wrapper = () => {
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

    return <Wrapper />
  })
