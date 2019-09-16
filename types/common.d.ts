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
  import ReactGridLayout, { ItemCallback, Layout, WidthProviderProps } from 'react-grid-layout'
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

  export { ItemCallback, WidthProvider, Layout }
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
