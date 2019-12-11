import { WidgetSettingsItem } from '../WidgetSettingsItem'

type Props<T extends string> = {
  name: string
  value?: T
  values: ReadonlyArray<{
    value: T
    name: string
  }>
  onChange: (value: T) => void
}

export const WidgetSettingsSelect = <T extends string>({
  name,
  value,
  values,
  onChange,
}: Props<T>) => (
  <WidgetSettingsItem name={name}>
    <select value={value} onChange={e => onChange(e.target.value as T)}>
      {values.map(item => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  </WidgetSettingsItem>
)
