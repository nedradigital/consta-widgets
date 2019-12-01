import * as _ from 'lodash'

import { angleToCoord, deg2rad, sortFigureValues } from '../'

describe('angleToCoord', () => {
  it('calculates coordinates for the far right point', () => {
    expect(angleToCoord(deg2rad(0), 1)).toEqual({
      xPercent: 100,
      yPercent: 50,
    })
  })

  it('calculates coordinates for the far bottom point', () => {
    expect(angleToCoord(deg2rad(90), 1)).toEqual({
      xPercent: 50,
      yPercent: 100,
    })
  })

  it('calculates coordinates for the halfway left point', () => {
    expect(angleToCoord(deg2rad(180), 0.5)).toEqual({
      xPercent: 25,
      yPercent: 50,
    })
  })

  it('rounds percentage', () => {
    expect(angleToCoord(deg2rad(180), 1)).toEqual({
      xPercent: 0,
      yPercent: 50,
    })
  })

  it('calculates coordinates for the far bottom right point', () => {
    expect(angleToCoord(deg2rad(45), 1)).toEqual({
      xPercent: _.round(50 + (Math.sqrt(2) / 2) * 50, 2),
      yPercent: _.round(50 + (Math.sqrt(2) / 2) * 50, 2),
    })
  })
})

describe('sortFigureValues', () => {
  it('Сортировка значений фигуры по названию осей', () => {
    const axesNames: readonly string[] = ['force', 'agility', 'intelligence']
    const values = [
      { axisName: 'agility', value: 0 },
      { axisName: 'intelligence', value: 0 },
      { axisName: 'force', value: 0 },
    ] as const

    expect(sortFigureValues(values, axesNames)).toEqual([
      { axisName: 'force', value: 0 },
      { axisName: 'agility', value: 0 },
      { axisName: 'intelligence', value: 0 },
    ])
  })
})
