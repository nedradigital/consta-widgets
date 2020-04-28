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
import { DataMap, DataType } from '@/dashboard'
import {
  ExtendedEditModeOnlyParams,
  TextBasicEditModeParams,
  TextExtendedEditModeParams,
  textParams,
  TextParams as Params,
} from '@/dashboard/widget-params'
import { getFormattedFontSizeName } from '@/utils/size-name-formatters'
import { useTooltipReposition } from '@/utils/tooltips'
import { IconSize, TextSize } from '@/utils/ui-kit'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, OnChangeParams, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

type TextType = {
  [key in TextBasicEditModeParams['type']]: {
    text: string
    props: Omit<
      TextExtendedEditModeParams,
      'text' | 'croppedLineCount' | 'croppedWithGradient' | 'type'
    >
  }
}

type EditModeParams<T> = {
  params: T
  onChangeParams: OnChangeParams<T>
}

export const widgetId = 'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5'

const textType: TextType = {
  heading1: {
    text: 'Заголовок 1',
    props: {
      size: '3xl',
      lineHeight: 'xs',
      weight: 'bold',
      view: 'primary',
    },
  },
  heading2: {
    text: 'Заголовок 2',
    props: {
      size: 'xl',
      lineHeight: 's',
      weight: 'bold',
      view: 'primary',
    },
  },
  heading3: {
    text: 'Заголовок 3',
    props: {
      size: 'l',
      lineHeight: 's',
      weight: 'bold',
      view: 'primary',
    },
  },
  heading4: {
    text: 'Заголовок 4',
    props: {
      size: 's',
      lineHeight: 's',
      weight: 'bold',
      view: 'primary',
      transform: 'uppercase',
    },
  },
  text1: {
    text: 'Текст 1',
    props: {
      size: 's',
      lineHeight: 'xs',
      view: 'primary',
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

const getIconMargin = (textSize: TextSize): string =>
  ['2xs', 'xs', 's', 'm'].includes(textSize) ? 'var(--space-xs)' : 'var(--space-s)'

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

export const textAligns: ReadonlyArray<NonNullable<TextExtendedEditModeParams['align']>> = [
  'left',
  'center',
  'right',
] as const
export const textDecorations: ReadonlyArray<NonNullable<
  TextExtendedEditModeParams['decoration']
>> = ['underline'] as const
export const fontFamilies: ReadonlyArray<NonNullable<TextExtendedEditModeParams['font']>> = [
  'mono',
  'sans',
  'serif',
] as const
export const lineHeights: ReadonlyArray<NonNullable<TextExtendedEditModeParams['lineHeight']>> = [
  '2xs',
  'xs',
  's',
  'm',
  'l',
] as const
export const textSpacings: ReadonlyArray<NonNullable<TextExtendedEditModeParams['spacing']>> = [
  'xs',
  's',
  'm',
  'l',
] as const
export const fontStyles: ReadonlyArray<NonNullable<TextExtendedEditModeParams['fontStyle']>> = [
  'italic',
] as const
export const textTransforms: ReadonlyArray<NonNullable<TextExtendedEditModeParams['transform']>> = [
  'uppercase',
] as const
export const fontWeights: ReadonlyArray<NonNullable<TextExtendedEditModeParams['weight']>> = [
  'black',
  'bold',
  'light',
  'regular',
  'semibold',
  'thin',
] as const
export const views: ReadonlyArray<NonNullable<TextExtendedEditModeParams['view']>> = [
  'alert',
  'brand',
  'ghost',
  'link',
  'link-minor',
  'primary',
  'secondary',
  'success',
  'warning',
] as const

const dataType = DataType.Text
type Data = DataMap[typeof dataType] | typeof undefined

export const defaultParams: TextBasicEditModeParams = { text: 'Заголовок', type: 'text1' }

const extendedModeReset: Record<keyof ExtendedEditModeOnlyParams, undefined> = {
  view: undefined,
  fontStyle: undefined,
  align: undefined,
  size: undefined,
  decoration: undefined,
  font: undefined,
  lineHeight: undefined,
  spacing: undefined,
  transform: undefined,
  weight: undefined,
}

const isExtendedEditMode = (params: Params): params is TextExtendedEditModeParams =>
  params.type === 'advanced'

export const TextWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({ data, params }) => {
  const { text: paramsText, croppedWithGradient, croppedLineCount } = params

  const textRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const { height: textHeight, width: textWidth } = useComponentSize(textRef)

  const [isVisibleGradient, changeIsVisibleGradient] = React.useState(false)
  const [tooltipVisible, setTooltipVisibility] = React.useState(false)

  const text = data && data.text ? data.text : paramsText
  const textProps = isExtendedEditMode(params)
    ? {
        align: params.align,
        view: params.view,
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

  useClickOutside({
    isActive: tooltipVisible,
    ignoreClicksInsideRefs: [buttonRef, tooltipRef],
    handler: () => setTooltipVisibility(false),
  })

  useTooltipReposition({
    isVisible: tooltipVisible,
    anchorRef: buttonRef,
    onRequestReposition: () => setTooltipVisibility(false),
  })

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
        className={classnames(
          css.text,
          Boolean(croppedLineCount) && css.isCropped,
          croppedWithGradient && isVisibleGradient && css.isWithGradient
        )}
      >
        <div ref={textRef}>{text}</div>
      </Text>
      {data && (data.tooltip || data.onClick) && (
        <div style={{ marginLeft: getIconMargin(size) }}>
          <button type="button" ref={buttonRef} className={css.button} onClick={onToggleClick}>
            <IconMeatball size={iconSizes[size]} />
          </button>
          <Tooltip
            ref={tooltipRef}
            isVisible={tooltipVisible}
            direction="downCenter"
            anchorRef={buttonRef}
            isContentHoverable
          >
            {data.tooltip}
          </Tooltip>
        </div>
      )}
    </div>
  )
}

const BasicEditMode = ({ params, onChangeParams }: EditModeParams<TextBasicEditModeParams>) => (
  <WidgetSettingsSelect
    name="Тип"
    value={params.type}
    onChange={value => onChangeParams({ type: value })}
    values={textParams.typeNames.map(i => ({ value: i, name: i }))}
  />
)

const ExtendedEditMode = ({
  params,
  onChangeParams,
}: EditModeParams<TextExtendedEditModeParams>) => (
  <>
    <WidgetSettingsSelect
      name="Размер шрифта"
      value={params.size}
      onChange={value => onChangeParams({ size: value })}
      values={fontSizes.map(value => ({
        name: getFormattedFontSizeName({ value }),
        value,
      }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Выравнивание"
      value={params.align}
      onChange={value => onChangeParams({ align: value })}
      values={textAligns.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Оформление"
      value={params.decoration}
      onChange={value => onChangeParams({ decoration: value })}
      values={textDecorations.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Тип шрифта"
      value={params.font}
      onChange={value => onChangeParams({ font: value })}
      values={fontFamilies.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Цвет"
      value={params.view}
      onChange={value => onChangeParams({ view: value })}
      values={views.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Межстрочный интервал"
      value={params.lineHeight}
      onChange={value => onChangeParams({ lineHeight: value })}
      values={lineHeights.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Межбуквенный интервал"
      value={params.spacing}
      onChange={value => onChangeParams({ spacing: value })}
      values={textSpacings.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Начертание"
      value={params.fontStyle}
      onChange={value => onChangeParams({ fontStyle: value })}
      values={fontStyles.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Регистр"
      value={params.transform}
      onChange={value => onChangeParams({ transform: value })}
      values={textTransforms.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
    <WidgetSettingsSelect
      name="Насыщенность"
      value={params.weight}
      onChange={value => onChangeParams({ weight: value })}
      values={fontWeights.map(i => ({ value: i, name: i }))}
      withEmptyValue
    />
  </>
)

export const EditMode = ({ params, onChangeParams }: EditModeParams<Params>) => {
  const handleChangeMode = (isModeSwitchedToExtended: boolean | null) => {
    onChangeParams(
      isModeSwitchedToExtended
        ? {
            type: 'advanced',
          }
        : {
            ...extendedModeReset,
            ...defaultParams,
          }
    )
  }

  return (
    <>
      <WidgetSettingsText
        name="Текст"
        value={params.text}
        onChange={value => onChangeParams({ text: value })}
      />
      <WidgetSettingsNumber
        name="После какой строки обрезать текст"
        value={params.croppedLineCount}
        onChange={value => onChangeParams({ croppedLineCount: value })}
      />
      <WidgetSettingsCheckbox
        name="Закрашивать градиентом обрезаемую строку"
        value={params.croppedWithGradient}
        onChange={value => onChangeParams({ croppedWithGradient: value })}
      />
      <WidgetSettingsItem name={'Режим редактирования'}>
        <ChoiceGroup
          items={[...editMods]}
          value={isExtendedEditMode(params)}
          isMultiple={false}
          wpSize="s"
          onChange={handleChangeMode}
        />
      </WidgetSettingsItem>
      {isExtendedEditMode(params) ? (
        <ExtendedEditMode params={params} onChangeParams={onChangeParams} />
      ) : (
        <BasicEditMode params={params} onChangeParams={onChangeParams} />
      )}
    </>
  )
}

export const TextWidget = createWidget<Data, Params>({
  id: widgetIdsByType.TextWidget,
  name: 'Текст',
  defaultParams,
  dataType,
  Content: TextWidgetContent,
  allowEmptyData: true,
  renderSettings(params, onChangeParams) {
    return <EditMode params={params} onChangeParams={onChangeParams} />
  },
})
