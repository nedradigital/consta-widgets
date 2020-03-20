import { useState } from 'react'
import AnimateHeight from 'react-animate-height'

import { IconArrowUp, Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Legend } from '@/components/Legend'
import { Roadmap } from '@/components/Roadmap'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { DataMap, DataType } from '@/dashboard/types'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

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
              <IconArrowUp
                size="s"
                view="secondary"
                className={classnames(css.icon, isOpened && css.isOpened)}
              />
            ) : null}
            <Text tag="span" size="xl" weight="bold" view="primary">
              {item.title}
            </Text>
          </span>
        ) : null}
        {item.subTitle ? (
          <>
            <Text
              tag="span"
              size="s"
              weight="bold"
              view="secondary"
              transform="uppercase"
              className={css.subTitle}
            >
              {item.subTitle.name}
            </Text>
            <Text tag="span" size="xl" weight="bold">
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
            filters={item.data.filters}
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
