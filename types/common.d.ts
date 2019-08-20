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
  import { Layouts, Responsive, WidthProviderProps } from 'react-grid-layout'
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

  export { Layouts, Responsive, WidthProvider }
}
