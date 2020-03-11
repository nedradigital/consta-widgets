import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import { Text } from '@gpn-design/uikit'
import useComponentSize from '@rehooks/component-size'
import classnames from 'classnames'

import { Tooltip } from '@/components/Tooltip'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { WidgetSettingsNumber } from '@/components/WidgetSettingsNumber'
import { WidgetSettingsSelect } from '@/components/WidgetSettingsSelect'
import { WidgetSettingsText } from '@/components/WidgetSettingsText'
import { DataMap, DataType } from '@/dashboard/types'
import { PositionState } from '@/utils/tooltips'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import { ReactComponent as IconSettings } from './icons/settings.svg'
import css from './index.css'

const dataType = DataType.Text
type Data = DataMap[typeof dataType] | typeof undefined

export const widgetId = 'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5'

export const typeNames = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'text1',
  'text2',
  'text3',
] as const
export type TypeNames = typeof typeNames[number]

type Params = {
  text: string
  type: TypeNames
  croppedLineCount?: number
  croppedWithGradient?: boolean
}

type StyleProps = Omit<React.ComponentProps<typeof Text>, 'children' | 'tag'>
type Size = NonNullable<StyleProps['size']>

type TextType = {
  [key in TypeNames]: {
    text: string
    props: StyleProps
  }
}

const textType: TextType = {
  heading1: {
    text: 'Заголовок 1',
    props: {
      size: '3xl',
      weight: 'bold',
    },
  },
  heading2: {
    text: 'Заголовок 2',
    props: {
      size: 'xl',
      weight: 'bold',
    },
  },
  heading3: {
    text: 'Заголовок 3',
    props: {
      size: 'l',
      weight: 'bold',
    },
  },
  heading4: {
    text: 'Заголовок 4',
    props: {
      size: 's',
      weight: 'bold',
      transform: 'uppercase',
    },
  },
  text1: {
    text: 'Текст 1',
    props: {
      size: 's',
    },
  },
  text2: {
    text: 'Текст 2',
    props: {
      size: 'xs',
      view: 'secondary',
    },
  },
  text3: {
    text: 'Текст 3',
    props: {
      size: 'xs',
      view: 'secondary',
      weight: 'bold',
    },
  },
}

const iconSize: Record<Size, string> = {
  '2xs': css.sizeXS,
  xs: css.sizeXS,
  s: css.sizeS,
  m: css.sizeL,
  l: css.sizeL,
  xl: css.sizeXL,
  '2xl': css.sizeXL,
  '3xl': css.size3XL,
  '4xl': css.size3XL,
  '5xl': css.size3XL,
  '6xl': css.size3XL,
}

export const defaultParams: Params = { text: 'Заголовок', type: 'text1' }

export const TextWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params: { text: paramsText, type, croppedLineCount, croppedWithGradient },
}) => {
  const textRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const { height: textHeight, width: textWidth } = useComponentSize(textRef)

  const [isVisibleGradient, changeIsVisibleGradient] = React.useState(false)
  const [tooltipVisible, setTooltipVisibility] = React.useState(false)
  const [tooltipPosition, setTooltipPosition] = React.useState<PositionState>()

  const text = data && data.text ? data.text : paramsText
  const textProps = textType[type].props
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
        className={classnames(
          css.text,
          Boolean(croppedLineCount) && css.isCropped,
          croppedWithGradient && isVisibleGradient && css.isWithGradient
        )}
      >
        <div ref={textRef}>{text}</div>
      </Text>
      {data && (data.tooltip || data.onClick) && (
        <div className={css.toggleable}>
          <button ref={buttonRef} className={css.button} onClick={onToggleClick}>
            <IconSettings className={classnames(iconSize[size])} />
          </button>
          <Tooltip
            ref={tooltipRef}
            className={css.tooltip}
            isVisible={tooltipVisible}
            verticalDirection="bottom"
            position={tooltipPosition}
          >
            {data.tooltip}
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export const TextWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Текст',
  defaultParams,
  dataType,
  Content: TextWidgetContent,
  allowEmptyData: true,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsText
          name="Текст"
          value={params.text}
          onChange={value => onChangeParam('text', value)}
        />
        <WidgetSettingsSelect
          name="Тип"
          value={params.type}
          onChange={value => onChangeParam('type', value)}
          values={typeNames.map(i => ({ value: i, name: i }))}
        />
        <WidgetSettingsNumber
          name="После какой строки обрезать текст"
          value={params.croppedLineCount}
          onChange={value => onChangeParam('croppedLineCount', value)}
        />
        <WidgetSettingsCheckbox
          name="Закрашивать градиентом обрезаемую строку"
          value={params.croppedWithGradient}
          onChange={value => onChangeParam('croppedWithGradient', value)}
        />
      </>
    )
  },
})
