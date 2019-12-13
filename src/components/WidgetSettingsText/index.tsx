import { WidgetSettingsItem } from '../WidgetSettingsItem'

type Props = {
  name: string
  value?: string | number
  onChange: (value: string) => void
}

export const WidgetSettingsText: React.FC<Props> = ({ name, value, onChange }) => (
  <WidgetSettingsItem name={name}>
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
  </WidgetSettingsItem>
)
