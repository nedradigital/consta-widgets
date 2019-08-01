import { castCircleData, castData, castSafeData } from '../index'

const planData = [50, 552, 552, 1779, 1779, 1779]
const factData = [52, 552, 552, 667, 1370, 1557]

describe('castData', () => {
  it('returns clear array, if do not have arguments', () => {
    expect(castData()).toEqual([])
  })

  it('returns array, if argument is number', () => {
    expect(castData(2)).toEqual([2, 2])
  })

  it('returns array, if arguments are number and length', () => {
    expect(castData(2, 5)).toEqual([2, 2, 2, 2, 2])
  })

  it('returns array, if argument is array with length 1', () => {
    expect(castData([2])).toEqual([2, 2])
  })
})

describe('castSafeData', () => {
  it('returns clean object', () => {
    expect(castSafeData({})).toEqual({
      safePlanData: [],
      safeFactData: [],
      maxDuration: 0,
      minValue: Infinity,
      maxValue: -Infinity,
    })
  })

  it('return summary if each data is array', () => {
    const result = castSafeData({ planData, factData })

    expect(result).toEqual({
      safePlanData: planData,
      safeFactData: factData,
      maxDuration: 5,
      minValue: 50,
      maxValue: 1779,
    })
  })

  it('return summary if one data is number', () => {
    const result = castSafeData({ planData, factData: 1 })

    expect(result).toEqual({
      safePlanData: planData,
      safeFactData: [1, 1, 1, 1, 1],
      maxDuration: 5,
      minValue: 1,
      maxValue: 1779,
    })
  })
})

describe('castCircleData', () => {
  it('returns correct data', () => {
    expect(
      castCircleData({
        safeFactData: factData,
        maxDuration: 5,
        minValue: 50,
        maxValue: 1779,
      })
    ).toEqual({
      circleBottom: 0.871602082128398,
      circleLeft: 1,
    })
  })
})
