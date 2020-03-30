import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import { ChoiceGroup, IconMeatball, Text } from '@gpn-design/uikit'
import { ChoiceT } from '@gpn-design/uikit/dist/components/ChoiceGroup'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { DataMap, DataType } from '@/dashboard/types'
import { PositionState } from '@/utils/tooltips'
import { IconSize, TextSize } from '@/utils/ui-kit'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, OnChangeParam, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

type TextProps = Omit<
  React.ComponentProps<typeof Text>,
  'children' | 'tag' | 'display' | 'type' | 'className'
>

type CommonParams = {
  text: string
  croppedLineCount?: number
  croppedWithGradient?: boolean
}

type BasicEditModeParams = CommonParams & {
  type: TypeName
}

type ExtendedEditModeParams = CommonParams & {
  type: 'advanced'
} & TextProps

type Params = BasicEditModeParams | ExtendedEditModeParams

type TextType = {
  [key in TypeName]: {
    text: string
    props: TextProps
  }
}

type EditModeParams<T> = {
  params: T
  onChangeParam: OnChangeParam<T>
}

export const widgetId = 'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5'

const textType: TextType = {
  heading1: {
    text: 'Заголовок 1',
    props: {
      size: '3xl',
      lineHeight: 'xs',
      weight: 'bold',
    },
  },
  heading2: {
    text: 'Заголовок 2',
    props: {
      size: 'xl',
      lineHeight: 's',
      weight: 'bold',
    },
  },
  heading3: {
    text: 'Заголовок 3',
    props: {
      size: 'l',
      lineHeight: 's',
      weight: 'bold',
    },
  },
  heading4: {
    text: 'Заголовок 4',
    props: {
      size: 's',
      lineHeight: 's',
      weight: 'bold',
      transform: 'uppercase',
    },
  },
  text1: {
    text: 'Текст 1',
    props: {
      size: 's',
      lineHeight: 'xs',
    },
  },
  text2: {
    text: 'Текст 2',
    props: {
      size: 'xs',
      lineHeight: 's',
      view: 'secondary',
    },
  },
  text3: {
    text: 'Текст 3',
    props: {
      size: 'xs',
      lineHeight: 's',
      view: 'secondary',
      weight: 'bold',
    },
  },
}

const iconSizes: Record<TextSize, IconSize> = {
  '2xs': 's',
  xs: 's',
  s: 's',
  m: 's',
  l: 's',
  xl: 'm',
  '2xl': 'm',
  '3xl': 'm',
  '4xl': 'm',
  '5xl': 'm',
  '6xl': 'm',
}

const iconMargins: Record<TextSize, string> = {
  '2xs': 'var(--space-xs)',
  xs: 'var(--space-xs)',
  s: 'var(--space-xs)',
  m: 'var(--space-xs)',
  l: 'var(--space-s)',
  xl: 'var(--space-s)',
  '2xl': 'var(--space-m)',
  '3xl': 'var(--space-m)',
  '4xl': 'var(--space-m)',
  '5xl': 'var(--space-m)',
  '6xl': 'var(--space-m)',
}

const editMods: ReadonlyArray<ChoiceT<boolean>> = [
  {
    label: 'Базовый',
    value: false,
  },
  {
    label: 'Расширенный',
    value: true,
  },
]

export const typeNames = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'text1',
  'text2',
  'text3',
] as const
type TypeName = typeof typeNames[number]

export const fontSizes: readonly TextSize[] = [
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
] as const

export const textAligns: ReadonlyArray<NonNullable<TextProps['align']>> = [
  'left',
  'center',
  'right',
] as const
export const textDecorations: ReadonlyArray<NonNullable<TextProps['decoration']>> = [
  'underline',
] as const
export const fontFamilies: ReadonlyArray<NonNullable<TextProps['font']>> = [
  'mono',
  'sans',
  'serif',
] as const
export const lineHeights: ReadonlyArray<NonNullable<TextProps['lineHeight']>> = [
  '2xs',
  'xs',
  's',
  'm',
  'l',
] as const
export const textSpacings: ReadonlyArray<NonNullable<TextProps['spacing']>> = [
  'xs',
  's',
  'm',
  'l',
] as const
export const fontStyles: ReadonlyArray<NonNullable<TextProps['fontStyle']>> = ['italic'] as const
export const textTransforms: ReadonlyArray<NonNullable<TextProps['transform']>> = [
  'uppercase',
] as const
export const fontWeights: ReadonlyArray<NonNullable<TextProps['weight']>> = [
  'black',
  'bold',
  'light',
  'regular',
  'semibold',
  'thin',
] as const

const dataType = DataType.Text
type Data = DataMap[typeof dataType] | typeof undefined

export const defaultParams: BasicEditModeParams = { text: 'Заголовок', type: 'text1' }

const isExtendedEditMode = (params: Params): params is ExtendedEditModeParams =>
  params.type === 'advanced'

export const TextWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data, params }) => {
  const { text: paramsText, croppedWithGradient, croppedLineCount } = params

  const textRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const { height: textHeight, width: textWidth } = useComponentSize(textRef)

  const [isVisibleGradient, changeIsVisibleGradient] = React.useState(false)
  const [tooltipVisible, setTooltipVisibility] = React.useState(false)
  const [tooltipPosition, setTooltipPosition] = React.useState<PositionState>()

  const text = data && data.text ? data.text : paramsText
  const textProps = isExtendedEditMode(params)
    ? {
        align: params.align,
        decoration: params.decoration,
        font: params.font,
        lineHeight: params.lineHeight,
        size: params.size,
        spacing: params.spacing,
        fontStyle: params.fontStyle,
        transform: params.transform,
        weight: params.weight,
      }
    : textType[params.type].props

  const size = textProps.size || 's'

  /* Определение видимости градиента */
  React.useLayoutEffect(() => {
    const element = textRef.current

    if (element) {
      changeIsVisibleGradient(element.offsetHeight < element.scrollHeight)
    }
  }, [text, croppedLineCount, croppedWithGradient, textHeight, textWidth])

  const onToggleClick = () => {
    if (data && data.onClick) {
      return data.onClick()
    }

    setTooltipVisibility(!tooltipVisible)
  }

  /* Позиционирование тултипа */
  React.useLayoutEffect(() => {
    if (!buttonRef.current) {
      return
    }

    const {
      top,
      left,
      width: buttonWidth,
      height: buttonHeight,
    } = buttonRef.current.getBoundingClientRect()

    const x = left + buttonWidth / 2
    const y = top + buttonHeight

    if (tooltipPosition && tooltipPosition.x === x && tooltipPosition.y === y) {
      return
    }

    setTooltipPosition({ x, y })
  }, [buttonRef, tooltipVisible, tooltipPosition, setTooltipPosition])

  useClickOutside([buttonRef, tooltipRef], () => setTooltipVisibility(false))

  return (
    <div
      className={css.main}
      style={{
        ['--line-clamp' as string]: croppedLineCount,
      }}
    >
      <Text
        tag="div"
        {...textProps}
        view="primary"
        className={classnames(
          css.text,
          Boolean(croppedLineCount) && css.isCropped,
          croppedWithGradient && isVisibleGradient && css.isWithGradient
        )}
      >
        <div ref={textRef}>{text}</div>
      </Text>
      {data && (data.tooltip || data.onClick) && (
        <div style={{ marginLeft: iconMargins[size] }}>
          <button ref={buttonRef} className={css.button} onClick={onToggleClick}>
            <IconMeatball size={iconSizes[size]} />
          </button>
          <Tooltip
            ref={tooltipRef}
            isVisible={tooltipVisible}
            direction="downCenter"
            position={tooltipPosition}
            isContentHoverable
          >
            {data.tooltip}
          </Tooltip>
        </div>
      )}
    </div>
  )
}

const BasicEditMode = ({ params, onChangeParam }: EditModeParams<BasicEditModeParams>) => (
  <WidgetSettingsSelect
    name="Тип"
    value={params.type}
    onChange={value => onChangeParam('type', value)}
    values={typeNames.map(i => ({ value: i, name: i }))}
  />
)

const ExtendedEditMode = ({ params, onChangeParam }: EditModeParams<ExtendedEditModeParams>) => (
  <>
    <WidgetSettingsSelect
      name="Размер шрифта"
      value={params.size}
      onChange={value => onChangeParam('size', value)}
      values={fontSizes.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Выравнивание"
      value={params.align}
      onChange={value => onChangeParam('align', value)}
      values={textAligns.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Оформление"
      value={params.decoration}
      onChange={value => onChangeParam('decoration', value)}
      values={textDecorations.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Тип шрифта"
      value={params.font}
      onChange={value => onChangeParam('font', value)}
      values={fontFamilies.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Межстрочный интервал"
      value={params.lineHeight}
      onChange={value => onChangeParam('lineHeight', value)}
      values={lineHeights.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Межбуквенный интервал"
      value={params.spacing}
      onChange={value => onChangeParam('spacing', value)}
      values={textSpacings.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Начертание"
      value={params.fontStyle}
      onChange={value => onChangeParam('fontStyle', value)}
      values={fontStyles.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Регистр"
      value={params.transform}
      onChange={value => onChangeParam('transform', value)}
      values={textTransforms.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Насыщенность"
      value={params.weight}
      onChange={value => onChangeParam('weight', value)}
      values={fontWeights.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
  </>
)

export const EditMode = (props: EditModeParams<Params>) => (
  <>
    <WidgetSettingsText
      name="Текст"
      value={props.params.text}
      onChange={value => props.onChangeParam('text', value)}
    />
    <WidgetSettingsNumber
      name="После какой строки обрезать текст"
      value={props.params.croppedLineCount}
      onChange={value => props.onChangeParam('croppedLineCount', value)}
    />
    <WidgetSettingsCheckbox
      name="Закрашивать градиентом обрезаемую строку"
      value={props.params.croppedWithGradient}
      onChange={value => props.onChangeParam('croppedWithGradient', value)}
    />
    <WidgetSettingsItem name={'Режим редактирования'}>
      <ChoiceGroup
        items={[...editMods]}
        value={isExtendedEditMode(props.params)}
        isMultiple={false}
        wpSize="s"
        onChange={newValue =>
          props.onChangeParam('type', newValue ? 'advanced' : defaultParams.type)
        }
      />
    </WidgetSettingsItem>
    {isExtendedEditMode(props.params) ? (
      <ExtendedEditMode params={props.params} onChangeParam={props.onChangeParam} />
    ) : (
      <BasicEditMode params={props.params} onChangeParam={props.onChangeParam} />
    )}
  </>
)

export const TextWidget = createWidget<Data, Params>({
  id: widgetIdsByType.TextWidget,
  name: 'Текст',
  defaultParams,
  dataType,
  Content: TextWidgetContent,
  allowEmptyData: true,
  renderSettings(params, onChangeParam) {
    return <EditMode params={params} onChangeParam={onChangeParam} />
  },
})
