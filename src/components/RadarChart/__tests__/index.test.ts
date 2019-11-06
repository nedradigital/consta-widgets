import { angleToCoord, deg2rad } from '../'

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

  it('calculates coordinates for the far bottom right point', () => {
    expect(angleToCoord(deg2rad(45), 1)).toEqual({
      xPercent: 50 + (Math.sqrt(2) / 2) * 50,
      yPercent: 50 + (Math.sqrt(2) / 2) * 50,
    })
  })

  it('calculates coordinates for the halfway left point', () => {
    expect(angleToCoord(deg2rad(180), 0.5)).toEqual({
      xPercent: 25,
      yPercent: 50,
    })
  })
})
