import { getComputedPositionAndDirection } from '@/Tooltip/helpers'

import { directions } from '../'

const PARENT_SIZE = {
  width: 500,
  height: 500,
}

const ANCHOR_SIZE = {
  width: 100,
  height: 50,
}

const ELEMENT_SIZE = {
  width: 100,
  height: 50,
}

const initialParams = {
  tooltipSize: ELEMENT_SIZE,
  parentSize: PARENT_SIZE,
  possibleDirections: directions,
  bannedDirections: [],
  direction: 'left',
  offset: 0,
} as const

describe('getComputedPositionAndDirection', () => {
  describe('если тултип спозициронирован относительно координат', () => {
    it('возвращаем неопределенную позицию, если данные для позиции не полные', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          direction: 'right',
          position: { x: 250, y: undefined },
        })
      ).toEqual({
        direction: 'right',
        position: { x: undefined, y: undefined },
      })
    })

    it('отображаем тултип вниз по центру', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          position: { x: 250, y: 50 },
        })
      ).toEqual({
        direction: 'downCenter',
        position: { x: 200, y: 50 },
      })
    })

    it('отображаем тултип вверх по центру', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          position: { x: 150, y: 490 },
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: 100, y: 440 },
      })
    })

    it('отображаем тултип снизу по левому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          position: { x: 10, y: 10 },
        })
      ).toEqual({
        direction: 'downRight',
        position: { x: 10, y: 10 },
      })
    })

    it('отображаем тултип снизу по правому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          position: { x: 490, y: 10 },
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 390, y: 10 },
      })
    })

    it('отображаем тултип сверху по левому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          position: { x: 10, y: 490 },
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 10, y: 440 },
      })
    })

    it('отображаем тултип сверху по правому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          position: { x: 490, y: 490 },
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 390, y: 440 },
      })
    })

    it('отображаем тултип справа', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          parentSize: {
            height: 50,
            width: 500,
          },
          position: { x: 50, y: 25 },
        })
      ).toEqual({
        direction: 'right',
        position: { x: 50, y: 25 },
      })
    })

    it('отображаем тултип слева', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          parentSize: {
            height: 50,
            width: 500,
          },
          position: { x: 450, y: 25 },
        })
      ).toEqual({
        direction: 'left',
        position: { x: 350, y: 25 },
      })
    })

    it('если тултип никуда не помещается, то используем первоначальные настройки', () => {
      expect(
        getComputedPositionAndDirection({
          ...initialParams,
          direction: 'downCenter',
          parentSize: {
            height: 50,
            width: 100,
          },
          position: { x: 50, y: 25 },
          tooltipSize: { width: 200, height: 300 },
        })
      ).toEqual({
        direction: 'downCenter',
        position: { x: -50, y: 25 },
      })
    })
  })

  describe('если тултип спозициронирован относительно элемента', () => {
    const params = {
      ...initialParams,
      offset: 5,
    } as const

    it('отображаем тултип вниз по центру', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 100,
            right: 300,
            left: 200,
            bottom: 150,
          },
        })
      ).toEqual({
        direction: 'downCenter',
        position: { x: 200, y: 155 },
      })
    })

    it('отображаем тултип вверх по центру', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 450,
            right: 500,
            left: 400,
            bottom: 500,
          },
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: 400, y: 395 },
      })
    })

    it('отображаем тултип снизу по левому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          tooltipSize: {
            width: 200,
            height: 50,
          },
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 0,
            right: 100,
            left: 0,
            bottom: 50,
          },
        })
      ).toEqual({
        direction: 'downRight',
        position: { x: 0, y: 55 },
      })
    })

    it('отображаем тултип снизу по правому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          tooltipSize: {
            width: 200,
            height: 50,
          },
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 0,
            right: 500,
            left: 400,
            bottom: 50,
          },
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 300, y: 55 },
      })
    })

    it('отображаем тултип сверху по левому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          tooltipSize: {
            width: 200,
            height: 50,
          },
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 450,
            right: 100,
            left: 0,
            bottom: 500,
          },
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 0, y: 395 },
      })
    })

    it('отображаем тултип сверху по правому краю', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          tooltipSize: {
            width: 200,
            height: 50,
          },
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 450,
            right: 500,
            left: 400,
            bottom: 500,
          },
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 300, y: 395 },
      })
    })

    it('отображаем тултип справа', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          parentSize: {
            height: 50,
            width: 500,
          },
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 0,
            right: 100,
            left: 0,
            bottom: 50,
          },
        })
      ).toEqual({
        direction: 'right',
        position: { x: 105, y: 25 },
      })
    })

    it('отображаем тултип слева', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          parentSize: {
            height: 50,
            width: 500,
          },
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 0,
            right: 500,
            left: 400,
            bottom: 50,
          },
        })
      ).toEqual({
        direction: 'left',
        position: { x: 295, y: 25 },
      })
    })

    it('если тултип никуда не помещается, то используем первоначальные настройки', () => {
      expect(
        getComputedPositionAndDirection({
          ...params,
          direction: 'upCenter',
          parentSize: {
            height: 50,
            width: 100,
          },
          anchorClientRect: {
            ...ANCHOR_SIZE,
            top: 0,
            right: 100,
            left: 0,
            bottom: 50,
          },
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: 0, y: -55 },
      })
    })
  })

  describe('если список разрешенных сторон состоит не из всех возможных вариантов', () => {
    it('всегда отображаем элемент вниз', () => {
      expect(
        getComputedPositionAndDirection({
          parentSize: { width: 50, height: 500 },
          tooltipSize: { width: 100, height: 50 },
          direction: 'downCenter',
          position: { x: 25, y: 500 },
          possibleDirections: ['downCenter', 'downLeft', 'downRight'],
          bannedDirections: [],
        })
      ).toEqual({
        direction: 'downCenter',
        position: { x: -25, y: 500 },
      })
    })
  })

  describe('если есть список запрещенных сторон', () => {
    it('если вычисленная сторона под запретом, то возвращаем следующую подходящую сторону', () => {
      expect(
        getComputedPositionAndDirection({
          parentSize: { width: 50, height: 500 },
          tooltipSize: { width: 100, height: 50 },
          direction: 'upCenter',
          position: { x: 25, y: 500 },
          possibleDirections: directions,
          bannedDirections: ['downCenter'],
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: -25, y: 450 },
      })
    })

    it('если все стороны под запретом, то возвращаем дефолтную позицию', () => {
      expect(
        getComputedPositionAndDirection({
          parentSize: { width: 50, height: 500 },
          tooltipSize: { width: 100, height: 50 },
          direction: 'downCenter',
          position: { x: 25, y: 500 },
          possibleDirections: directions,
          bannedDirections: directions,
        })
      ).toEqual({
        direction: 'downCenter',
        position: { x: -25, y: 500 },
      })
    })
  })
})
