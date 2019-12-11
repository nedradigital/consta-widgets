declare module '*.svg' {
  export const ReactComponent: React.ComponentType<
    React.SVGProps<SVGSVGElement> & {
      children?: never
    }
  >
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module 'react-grid-layout-tmp-fork' {
  import ReactGridLayout, { Layout, Responsive, WidthProviderProps } from 'react-grid-layout'

  function WidthProvider<P>(
    component: React.ComponentClass<P>
  ): React.ComponentClass<
    P &
      WidthProviderProps & {
        isDroppable: boolean
        onDrop: (params: { x: number; y: number }) => void
        droppingPositionShift?: {
          x: number
          y: number
        }
      }
  >

  export default ReactGridLayout

  export { Layout, Responsive, WidthProvider }
}

declare module 'storybook-addon-smart-knobs' {
  import { DecoratorFn } from '@storybook/react'

  export const withSmartKnobs: (options?: { ignoreProps?: readonly string[] }) => DecoratorFn
}

declare module 'react-onclickout' {
  /* tslint:disable-next-line:ordered-imports */
  import { ComponentType } from 'react'

  const ClickOutHandler: ComponentType<{
    onClickOut: () => void
  }>

  export default ClickOutHandler
}

// полностью используем декларации d3 для перезаписи существующих
declare module 'd3' {
  export * from 'd3-array'
  export * from 'd3-axis'
  export * from 'd3-brush'
  export * from 'd3-chord'
  export * from 'd3-collection'
  export * from 'd3-color'
  export * from 'd3-contour'
  export * from 'd3-dispatch'
  export * from 'd3-drag'
  export * from 'd3-dsv'
  export * from 'd3-ease'
  export * from 'd3-fetch'
  export * from 'd3-force'
  export * from 'd3-format'
  export * from 'd3-geo'
  export * from 'd3-hierarchy'
  export * from 'd3-interpolate'
  export * from 'd3-path'
  export * from 'd3-polygon'
  export * from 'd3-quadtree'
  export * from 'd3-random'
  export * from 'd3-scale'
  export * from 'd3-scale-chromatic'
  export * from 'd3-selection'
  export * from 'd3-shape'
  export * from 'd3-time'
  export * from 'd3-time-format'
  export * from 'd3-timer'
  export * from 'd3-transition'
  export * from 'd3-voronoi'
  export * from 'd3-zoom'

  import { Numeric } from 'd3-array'

  export function extent<T, U extends Numeric>(
    array: ReadonlyArray<T>,
    accessor: (datum: T, index: number, array: ReadonlyArray<T>) => U | undefined | null
  ): readonly [U, U] | readonly [undefined, undefined]
}

declare module '*.geojson' {
  const content: d3.ExtendedFeatureCollection
  export = content
}

declare module '@gpn-design/uikit' {
  // TODO: заменить на типы, экспортированные из ui-кита
  import React from 'react'

  export type WpSize = 'xs' | 's' | 'm' | 'l'

  type ButtonProps = {
    type: 'submit' | 'reset' | 'button'
    disabled?: boolean
    wpSize: 'xs' | 's' | 'm' | 'l'
    view: 'clear' | 'ghost' | 'primary' | 'secondary'
    width?: 'auto' | 'full'
    form?:
      | 'default'
      | 'brick'
      | 'round'
      | 'brick-round'
      | 'round-brick'
      | 'brick-default'
      | 'default-brick'
    iconOnly?: boolean
    withIcon?: 'left' | 'right'
    children?: React.ReactNode
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onBlur?: React.FocusEventHandler<HTMLElement>
    tabIndex?: number
  }

  export const Button: React.ComponentType<ButtonProps>

  export type ChoiceT<T> = {
    value: T
    label: string
  }

  type SingleValueSpecificProps<T> = {
    isMultiple: false
    value?: T | null
    onChange?: (value: T | null) => void
  }
  type MultiValueSpecificProps<T> = {
    isMultiple: true
    value: T[]
    onChange?: (value: T[]) => void
  }

  type ChoiceGroupProps<T> = {
    items: ChoiceT<T>[]
    wpSize: WpSize
    form?: 'default' | 'brick' | 'round'
    className?: string
    disabled?: boolean
    onBlur?: React.FocusEventHandler<HTMLElement>
  } & (SingleValueSpecificProps<T> | MultiValueSpecificProps<T>)

  export const ChoiceGroup: React.ComponentType<ChoiceGroupProps<string | number>>

  type CheckboxProps = {
    wpSize: 'm' | 'l'
    value?: boolean
    disabled?: boolean
    intermediate?: boolean
    className?: string
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>

  export const Checkbox: React.ComponentType<CheckboxProps>
}
