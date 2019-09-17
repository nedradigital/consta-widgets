import { castData, castSafeData } from '../'

const planData = [50, 552, 552, 1779, 1779, 1779] as const
const factData = [52, 552, 552, 667, 1370, 1557] as const

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
    })
  })

  it('return summary if each data is array', () => {
    const result = castSafeData({ planData, factData })

    expect(result).toEqual({
      safePlanData: planData,
      safeFactData: factData,
    })
  })

  it('return summary if one data is number', () => {
    const result = castSafeData({ planData, factData: 1 })

    expect(result).toEqual({
      safePlanData: planData,
      safeFactData: [1, 1, 1, 1, 1],
    })
  })
})
