import { scaleBand, scaleLinear } from '../scale'

describe('scaleBand', () => {
  const DOMAIN = ['1', '2'] as const
  const RANGE = [0, 100] as const
  const PADDING = 10

  it('возвращает позицию для группы без отступов', () => {
    const scaler = scaleBand({
      domain: DOMAIN,
      range: RANGE,
    })

    expect(scaler.scale('1')).toEqual(0)
    expect(scaler.scale('2')).toEqual(50)
  })

  it('возвращает позицию для группы с отступами', () => {
    const scaler = scaleBand({
      domain: DOMAIN,
      range: RANGE,
      paddingInner: PADDING,
      paddingOuter: PADDING,
    })

    expect(scaler.scale('1')).toEqual(10)
    expect(scaler.scale('2')).toEqual(55)
  })

  it('возвращает позицию для группы со смещением влево', () => {
    const scaler = scaleBand({
      domain: DOMAIN,
      range: RANGE,
      align: 0,
      paddingInner: PADDING,
      paddingOuter: PADDING,
    })

    expect(scaler.scale('1')).toEqual(0)
    expect(scaler.scale('2')).toEqual(45)
  })

  it('возвращает позицию для группы со смещением вправо', () => {
    const scaler = scaleBand({
      domain: DOMAIN,
      range: RANGE,
      align: 1,
      paddingInner: PADDING,
      paddingOuter: PADDING,
    })

    expect(scaler.scale('1')).toEqual(20)
    expect(scaler.scale('2')).toEqual(65)
  })

  it('возвращает размер шага для группы без отступов', () => {
    const scaler = scaleBand({
      domain: DOMAIN,
      range: RANGE,
    })

    expect(scaler.bandwidth).toBeTruthy()
    expect(scaler.bandwidth!()).toEqual(50)
  })

  it('возвращает размер шага для группы с отступами', () => {
    const scaler = scaleBand({
      domain: DOMAIN,
      range: RANGE,
      paddingInner: PADDING,
      paddingOuter: PADDING,
    })

    expect(scaler.bandwidth).toBeTruthy()
    expect(scaler.bandwidth!()).toEqual(35)
  })
})

describe('scaleLinear', () => {
  const DOMAIN = [1, 2] as const
  const RANGE = [0, 100] as const

  it('возвращает позицию для числа', () => {
    const scaler = scaleLinear({
      domain: DOMAIN,
      range: RANGE,
    })

    expect(scaler.scale(1)).toEqual(0)
    expect(scaler.scale(2)).toEqual(100)
  })
})
