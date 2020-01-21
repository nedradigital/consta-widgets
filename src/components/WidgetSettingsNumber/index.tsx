import { WidgetSettingsItem } from '../WidgetSettingsItem'

type Props = {
  name: string
  value?: number
  minValue?: number
  maxValue?: number
  onChange: (value: number) => void
}

export const WidgetSettingsNumber: React.FC<Props> = ({
  name,
  value,
  minValue,
  maxValue,
  onChange,
}) => (
  <WidgetSettingsItem name={name}>
    <input
      type="number"
      value={value}
      min={minValue}
      max={maxValue}
      onChange={e => onChange(e.target.valueAsNumber)}
    />
  </WidgetSettingsItem>
)
