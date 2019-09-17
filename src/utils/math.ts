import * as _ from 'lodash'

// Положение средневзвешенного значения по x (в процентах)
export const getAverageWeightedPercent = (values: readonly number[]): number => {
  const weightedValues = values.map((value, idx) => idx * value)
  const medianIndex = _.sum(weightedValues) / _.sum(values)

  return (100 * medianIndex) / (values.length - 1)
}
