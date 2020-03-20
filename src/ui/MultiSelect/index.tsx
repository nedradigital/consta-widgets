import React from 'react'

import { useClickOutside } from '@csssr/gpn-utils/lib/use-click-outside'
import { Checkbox, IconSelect, Text } from '@gpn-design/uikit'
import classnames from 'classnames'
import * as _ from 'lodash'

import { SelectedOption } from '../SelectedOption'

import css from './index.css'

export type Option = {
  id: string
  name: string
}

type Values = readonly string[]

export type Props = {
  options: readonly Option[]
  values: Values
  onChange: (values: Values) => void
  placeholder?: string
}

const toggleValuePresence = (values: Values, valueIdToToggle: string) =>
  _.xor(values, [valueIdToToggle])

export const MultiSelect: React.FC<Props> = ({
  options,
  values = [],
  onChange,
  placeholder = 'Выберите пункт',
}) => {
  const [isSelectOpened, setIsSelectOpened] = React.useState(false)
  const handleOnSelectClick = () => setIsSelectOpened(!isSelectOpened)

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  useClickOutside([wrapperRef], () => setIsSelectOpened(false))

  const handleCheckboxChange = (id: string) => () => {
    onChange(toggleValuePresence(values, id))
  }

  return (
    <div className={css.multiSelect} ref={wrapperRef}>
      <div
        className={classnames(css.selectedList, isSelectOpened && css.isActive)}
        onClick={handleOnSelectClick}
      >
        {values.length ? (
          options.map(
            option =>
              values.includes(option.id) && (
                <div className={css.selectedOptionWrapper} key={option.id}>
                  <SelectedOption name={option.name} onRemove={handleCheckboxChange(option.id)} />
                </div>
              )
          )
        ) : (
          <Text tag="p" size="xs" className={css.placeholder}>
            {placeholder}
          </Text>
        )}
        <IconSelect size="xs" view="secondary" className={css.iconArrow} />
      </div>

      {isSelectOpened && (
        <div className={css.optionsList}>
          <div className={css.scrollableOptions}>
            {options.map(option => (
              <div
                className={classnames(css.option, values.includes(option.id) && css.isSelected)}
                key={option.id}
              >
                <Checkbox
                  wpSize="m"
                  className={css.optionCheckbox}
                  onChange={handleCheckboxChange(option.id)}
                  value={values.includes(option.id)}
                >
                  {option.name}
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
