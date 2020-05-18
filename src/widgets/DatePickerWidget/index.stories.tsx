import { date as knobsDate, object } from '@storybook/addon-knobs'

import { DateRange } from '@/components/DatePicker'
import { blockCenteringDecorator, createMetadata, createStory } from '@/utils/Storybook'

import { DatePickerWidgetContent, defaultParams } from '.'

const getDateLimitProps = () =>
  ({
    minDate: new Date(knobsDate('minDate', new Date(2019, 0, 1))),
    maxDate: new Date(knobsDate('maxDate', new Date(2020, 3, 2))),
  } as const)

export const DatePickerWidgetSingleStory = createStory(
  () => {
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
  },
  { name: 'выбор даты' }
)

export const DatePickerWidgetRangeStory = createStory(
  () => {
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
  },
  { name: 'выбор диапазона дат' }
)

export default createMetadata({
  title: 'widgets/DatePickerWidget',
  decorators: [blockCenteringDecorator()],
})
