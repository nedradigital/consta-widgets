import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { OnChangeParam } from '@/utils/WidgetFactory'

import { WrapperParams } from '../../'

export const sizeValues = {
  xl: 24,
  l: 20,
  m: 16,
  s: 12,
  xs: 8,
}

const directions = ['marginTop', 'marginRight'] as const

const directionText = {
  marginTop: 'Отступ сверху',
  marginRight: 'Отступ справа',
}

export type Size = keyof typeof sizeValues
const sizes = Object.keys(sizeValues) as readonly Size[]

type Props = {
  params: WrapperParams
  onChangeParam: OnChangeParam<WrapperParams>
}

export const MarginSettings: React.FC<Props> = ({ onChangeParam, params }) => {
  return (
    <>
      {directions.map(direction => (
        <WidgetSettingsItem key={direction} name={directionText[direction]}>
          <select
            value={params[direction]}
            onChange={e => onChangeParam(direction, (e.target.value as Size) || undefined)}
          >
            <option value={''}>--</option>
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
      ))}
    </>
  )
}
