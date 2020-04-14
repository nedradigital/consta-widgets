const valueTypes = ['default', 'text'] as const
const sizes = ['s', 'm'] as const

export type TrafficLightParams = {
  type: typeof valueTypes[number]
  size?: typeof sizes[number]
}

export const trafficLightParams = {
  valueTypes,
  sizes,
}
