import { WidgetSettingsItem } from '../WidgetSettingsItem'

type Props = {
  name: string
  value?: boolean
  onChange: (value: boolean) => void
}

export const WidgetSettingsCheckbox: React.FC<Props> = ({ name, value, onChange }) => (
  <WidgetSettingsItem name={name}>
    <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
  </WidgetSettingsItem>
)
