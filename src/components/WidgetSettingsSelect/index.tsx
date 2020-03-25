import { WidgetSettingsItem } from '../WidgetSettingsItem'

type CommonProps<T> = {
  name: string
  value?: T
  values: ReadonlyArray<{
    value: T
    name: string
    groupName?: string
  }>
  onChange: (value: T) => void
}

type WithEmptyValueProps<T> = CommonProps<T> & {
  withEmptyValue: true
  onChange: (value: T | undefined) => void
}

type Props<T> = CommonProps<T> | WithEmptyValueProps<T>

const EMPTY_VALUE = '--'

function isWithEmptyValue<T>(props: Props<T>): props is WithEmptyValueProps<T> {
  return 'withEmptyValue' in props
}

export const WidgetSettingsSelect = <T extends string | number>(props: Props<T>) => {
  const { name, value, values } = props

  const items = values.map((item, i) => ({ ...item, key: String(i) }))
  const selectedItem = items.find(item => item.value === value)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isWithEmptyValue(props) && event.target.value === EMPTY_VALUE) {
      return props.onChange(undefined)
    }

    const selected = items.find(item => item.key === event.target.value)
    selected && props.onChange(selected.value)
  }

  return (
    <WidgetSettingsItem name={name}>
      <select value={selectedItem?.key} onChange={handleChange}>
        {isWithEmptyValue(props) && <option>{EMPTY_VALUE}</option>}
        {items.map(item => (
          <option key={item.key} value={item.key}>
            {item.name}
          </option>
        ))}
      </select>
    </WidgetSettingsItem>
  )
}
