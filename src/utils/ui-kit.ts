import { Icon, Text } from '@gpn-design/uikit'

export type TextSize = NonNullable<React.ComponentProps<typeof Text>['size']>
export type IconSize = NonNullable<React.ComponentProps<typeof Icon>['size']>
export type TextProps = Omit<
  React.ComponentProps<typeof Text>,
  'children' | 'tag' | 'display' | 'type' | 'className'
>
