import { Direction } from '@/components/Legend'
import { Position, Size, Type } from '@/components/LegendItem'

export type LegendParams = {
  direction: Direction
  labelType: Type
  fontSize: Size
  labelPosition: Position
  lineBold?: boolean
}
