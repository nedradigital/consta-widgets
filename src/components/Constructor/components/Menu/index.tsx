import * as React from 'react'

import { classname } from '@/utils/classname'

import { DataType } from '../../'
import { Widget } from '../Widget'

import './index.css'

const cn = classname('menu')

export type MenuProps = {
  onToggleMode?: () => void
  onClear?: () => void
}

export const Menu: React.FunctionComponent<MenuProps> = props => {
  const { onToggleMode, onClear } = props

  return (
    <div className={cn()}>
      <Widget className={cn('widget-wrapper')} name="widget 1" dataType={DataType.Chart2D} />
      <Widget className={cn('widget-wrapper')} name="widget 2" dataType={DataType.Chart2D} />
      <Widget className={cn('widget-wrapper')} name="widget 3" dataType={DataType.PieChart} />
      <Widget className={cn('widget-wrapper')} name="widget 4" dataType={DataType.PieChart} />
      <div className={cn('buttons')}>
        <button type="button" onClick={onToggleMode}>
          Edit/Preview
        </button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  )
}
