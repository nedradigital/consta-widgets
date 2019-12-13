import { WidgetSettingsItem } from '../WidgetSettingsItem'

type Props = {
  name: string
  value?: number
  onChange: (value: number) => void
}

export const WidgetSettingsNumber: React.FC<Props> = ({ name, value, onChange }) => (
  <WidgetSettingsItem name={name}>
    <input type="number" value={value} onChange={e => onChange(e.target.valueAsNumber)} />
  </WidgetSettingsItem>
)
