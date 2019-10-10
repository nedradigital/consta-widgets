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

declare module 'pluralize-ru' {
  const pluralize: (count: number | string, ...args: any) => string
  export default pluralize
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

declare module '@gaz/utils' {
  export const calcSize: (size: number) => string
}

declare module '@nekitk/storybook-addon-smart-knobs' {
  import { StoryDecorator } from '@storybook/react'

  export const withSmartKnobs: StoryDecorator
}

// Source: https://github.com/Swizec/useDimensions/pull/17
declare module 'react-use-dimensions' {
  interface IDimensionObject {
    width: number
    height: number
    top: number
    left: number
    x: number
    y: number
    right: number
    bottom: number
  }

  export type UseDimensionsHook = readonly [
    (node: HTMLElement | SVGSVGElement | null) => void,
    IDimensionObject,
    HTMLElement | SVGSVGElement | null
  ]

  interface IUseDimensionsArgs {
    liveMeasure?: boolean
  }

  function useDimensions({ liveMeasure }?: IUseDimensionsArgs): UseDimensionsHook

  export default useDimensions
}

declare module 'react-onclickout' {
  /* tslint:disable-next-line:ordered-imports */
  import { ComponentType } from 'react'

  const ClickOutHandler: ComponentType<{
    onClickOut: () => void
  }>

  export default ClickOutHandler
}

declare module 'utils/postcss-utils' {
  export const calcSize: (size: number) => string
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
