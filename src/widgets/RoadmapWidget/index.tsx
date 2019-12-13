import { useState } from 'react'
import AnimateHeight from 'react-animate-height'

import classnames from 'classnames'

import { Legend } from '@/components/Legend'
import { Roadmap } from '@/components/Roadmap'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { DataMap, DataType } from '@/dashboard/types'
import { Text } from '@/ui/Text'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import { ReactComponent as IconArrowSvg } from './icons/icon_arrow.svg'
import css from './index.css'

const dataType = DataType.Roadmap
type Data = DataMap[typeof dataType]

export const widgetId = '3e85c9b1-2507-4dd0-955c-469a3f1919b5'

type Params = {
  areAllOpened: boolean
}

export const defaultParams = {
  areAllOpened: false,
}

const RoadmapBlock: React.FC<{
  item: Data[0]
  isInitiallyOpened: boolean
  isButtonDisabled: boolean
}> = ({ item, isInitiallyOpened, isButtonDisabled }) => {
  const [isOpened, setOpen] = useState(isInitiallyOpened)

  return (
    <div className={css.block}>
      <>
        {item.title ? (
          <span
            className={css.button}
            onClick={!isButtonDisabled ? () => setOpen(!isOpened) : undefined}
          >
            {!isButtonDisabled ? (
              <IconArrowSvg className={classnames(css.icon, isOpened && css.isOpened)} />
            ) : null}
            <Text className={css.text} size="xl" bold>
              {item.title}
            </Text>
          </span>
        ) : null}
        {item.subTitle ? (
          <>
            <Text className={classnames(css.text, css.subTitle)} size="s" bold uppercase secondary>
              {item.subTitle.name}
            </Text>
            <Text className={css.text} size="xl" bold>
              {item.subTitle.value}
            </Text>
          </>
        ) : null}
      </>
      <AnimateHeight delay={300} height={isOpened ? 'auto' : 0}>
        <div className={css.table}>
          <Roadmap
            data={item.data.values}
            titles={item.data.titles}
            currentDay={item.data.currentDay}
            colorGroups={item.colorGroups}
            startDate={item.data.startDate}
            endDate={item.data.endDate}
          />
        </div>
        {item.legend ? (
          <Legend
            fontSize="s"
            labelType="dot"
            labelPosition="left"
            direction="row"
            colorGroups={item.colorGroups}
            data={item.legend}
          />
        ) : null}
      </AnimateHeight>
    </div>
  )
}

export const RoadmapWidgetContent: React.FC<WidgetContentProps<Data, Params>> = ({
  data,
  params,
}) => (
  <>
    {data.map((item, index) => (
      <RoadmapBlock
        key={index}
        item={item}
        isButtonDisabled={data.length <= 1}
        isInitiallyOpened={params.areAllOpened ? true : index === 0}
      />
    ))}
  </>
)

export const RoadmapWidget = createWidget<Data, Params>({
  id: widgetId,
  name: 'Роадмап',
  defaultParams,
  dataType,
  Content: RoadmapWidgetContent,
  renderSettings(params, onChangeParam) {
    return (
      <>
        <WidgetSettingsCheckbox
          name="При открытии развернуть все блоки"
          value={params.areAllOpened}
          onChange={value => onChangeParam('areAllOpened', value)}
        />
      </>
    )
  },
})
