type TextProps = {
  align?: 'left' | 'center' | 'right'
  decoration?: 'underline'
  size?: '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  font?: 'mono' | 'sans' | 'serif'
  lineHeight?: '2xs' | 'xs' | 's' | 'm' | 'l'
  spacing?: 'xs' | 's' | 'm' | 'l'
  fontStyle?: 'italic'
  transform?: 'uppercase'
  weight?: 'black' | 'bold' | 'light' | 'regular' | 'semibold' | 'thin'
  view?:
    | 'alert'
    | 'brand'
    | 'ghost'
    | 'link'
    | 'link-minor'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
}

const typeNames = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'text1',
  'text2',
  'text3',
] as const
type TypeName = typeof typeNames[number]

type CommonParams = {
  text: string
  croppedLineCount?: number
  croppedWithGradient?: boolean
}

export type TextBasicEditModeParams = CommonParams & {
  type: TypeName
}

export type ExtendedEditModeOnlyParams = TextProps

export type TextExtendedEditModeParams = CommonParams & {
  type: 'advanced'
} & ExtendedEditModeOnlyParams

export type TextParams = TextBasicEditModeParams | TextExtendedEditModeParams

export const textParams = {
  typeNames,
}
