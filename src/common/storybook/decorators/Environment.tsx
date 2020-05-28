import { updateBaseSize } from '@csssr/gpn-utils/lib/css'
import { number, object } from '@storybook/addon-knobs'
import { DecoratorFn } from '@storybook/react'

import { BaseSizeContext } from '@/BaseSizeContext'

export const ENVIRONMENT_GROUP_ID = 'environment'

type EnvironmentDecoratorParams =
  | {
      width?: number
      height?: number
    }
  | undefined

export const environmentDecorator = (
  params: EnvironmentDecoratorParams
): DecoratorFn => storyFn => {
  const mainRef = React.useRef<HTMLDivElement>(null)

  const baseSize = number('base-size', 16, undefined, ENVIRONMENT_GROUP_ID)
  const width =
    params && params.width ? object('width', params.width, ENVIRONMENT_GROUP_ID) : undefined
  const height =
    params && params.height ? object('height', params.height, ENVIRONMENT_GROUP_ID) : undefined

  React.useEffect(() => {
    if (!mainRef.current) {
      return
    }

    updateBaseSize(baseSize, mainRef.current)
  }, [baseSize])

  return (
    <BaseSizeContext.Provider value={baseSize}>
      <div ref={mainRef} style={{ width, height }}>
        {storyFn()}
      </div>
    </BaseSizeContext.Provider>
  )
}
