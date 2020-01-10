import { WidgetSettingsItem } from '../WidgetSettingsItem'

type Props<T> = {
  name: string
  value: T
  values: ReadonlyArray<{
    value: T
    name: string
  }>
  withEmptyValue?: boolean
  onChange: (value: T) => void
}

export const WidgetSettingsSelect = <T extends string | number | undefined>({
  name,
  value,
  values,
  withEmptyValue,
  onChange,
}: Props<T>) => (
  <WidgetSettingsItem name={name}>
    <select value={value} onChange={e => onChange(e.target.value as T)}>
      {withEmptyValue && <option value={undefined}>--</option>}
      {values.map(item => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  </WidgetSettingsItem>
)
