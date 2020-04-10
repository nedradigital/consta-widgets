import { useState } from 'react'
import AnimateHeight from 'react-animate-height'

import { IconArrowUp, Text } from '@gpn-design/uikit'
import classnames from 'classnames'

import { Legend } from '@/components/Legend'
import { Roadmap } from '@/components/Roadmap'
import { WidgetSettingsCheckbox } from '@/components/WidgetSettingsCheckbox'
import { DataMap, DataType } from '@/dashboard'
import { RoadmapParams as Params } from '@/dashboard/widget-params'
import { widgetIdsByType } from '@/utils/widgets-list'
import { createWidget, WidgetContentProps } from '@/utils/WidgetFactory'

import css from './index.css'

const dataType = DataType.Roadmap
type Data = DataMap[typeof dataType]

export const defaultParams: Params = {
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
            <Text tag="span" size="l" weight="bold" view="secondary" className={css.subTitle}>
              {item.subTitle.name}
            </Text>
            <Text tag="span" size="xl" weight="bold" view="primary">
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
  id: widgetIdsByType.RoadmapWidget,
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
