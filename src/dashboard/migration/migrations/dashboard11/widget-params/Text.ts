import { TextProps } from '@/utils/ui-kit'

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

export type TextExtendedEditModeParams = CommonParams & {
  type: 'advanced'
} & TextProps

export type TextParams = TextBasicEditModeParams | TextExtendedEditModeParams

export const textParams = {
  typeNames,
}
