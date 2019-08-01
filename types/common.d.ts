declare module '*.svg' {
  export const ReactComponent: React.ComponentType<
    React.SVGProps<SVGSVGElement> & {
      children?: never;
    }
  >;
}

declare module '*.gif' {
  const content: string;
  export default content;
}
