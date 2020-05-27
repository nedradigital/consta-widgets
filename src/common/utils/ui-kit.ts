import { Icon, Text } from '@gpn-design/uikit'

export type TextProps = React.ComponentProps<typeof Text>
export type TextSize = NonNullable<TextProps['size']>
export type IconSize = NonNullable<React.ComponentProps<typeof Icon>['size']>
