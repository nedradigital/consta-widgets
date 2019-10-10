import { WidgetSettingsItem } from '@/components/WidgetSettingsItem'
import { StyleProps, Title } from '@/ui/Title'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

type Data = typeof undefined

export const widgetId = 'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5'

export const typeNames = ['heading1', 'heading2', 'heading3', 'text1', 'text2'] as const
export type TypeNames = typeof typeNames[number]

type Params = {
  title: string
  type: TypeNames
}

type TitleType = {
  [key in TypeNames]: {
    text: string
    props: StyleProps
  }
}

const titleType: TitleType = {
  heading1: {
    text: 'Заголовок 1',
    props: {
      size: '3xl',
      bold: true,
    },
  },
  heading2: {
    text: 'Заголовок 2',
    props: {
      size: 'xl',
      bold: true,
    },
  },
  heading3: {
    text: 'Заголовок 3',
    props: {
      size: 's',
      bold: true,
      uppercase: true,
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
      secondary: true,
    },
  },
}

export const defaultParams: Params = { title: 'Заголовок', type: 'text1' }

export const TitleWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  params: { title, type },
}) => (
  <Title {...titleType[type].props} className={css.title}>
    {title}
  </Title>
)

export const TitleWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Заголовок',
  defaultParams,
  dataType: null,
  Content: TitleWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsItem name="Заголовок">
          <input
            type="text"
            value={params.title}
            onChange={e => onChangeParam('title', e.target.value)}
          />
        </WidgetSettingsItem>
        <WidgetSettingsItem name="Тип">
          <select
            value={params.type}
            onChange={e => onChangeParam('type', e.target.value as TypeNames)}
          >
            {typeNames.map(type => (
              <option key={type} value={type}>
                {titleType[type].text}
              </option>
            ))}
          </select>
        </WidgetSettingsItem>
      </>
    )
  },
})
