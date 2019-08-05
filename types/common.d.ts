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
  const pluralize: (count: any, ...args: any) => string
  export default pluralize
}
