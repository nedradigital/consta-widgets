import { getComputedPositionAndDirection } from '@/components/Tooltip/helpers'

const ELEMENT_SIZE = {
  width: 100,
  height: 50,
}

const PARENT_SIZE = {
  width: 500,
  height: 500,
}

const ANCHOR_SIZE = {
  width: 100,
  height: 50,
}

const ANCHOR_OFFSET = 5

describe('getComputedPositionAndDirection', () => {
  describe('если тултип спозициронирован относительно координат', () => {
    it('если позиция входит в верхнюю левую границу, то переворачиваем элемент вниз и ровняем по левому краю', () => {
      const position = { x: 50, y: 50 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'downRight',
        position: {
          x: 50,
          y: 50,
        },
      })
    })

    it('если позиция входит в верхнюю границу, то переворачиваем элемент вниз и центрируем по горизонтали', () => {
      const position = { x: 250, y: 50 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'downCenter',
        position: { x: 200, y: 50 },
      })
    })

    it('если позиция входит в верхнюю правую границу, то переворачиваем элемент вниз и ровняем по правому краю', () => {
      const position = { x: 450, y: 25 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 350, y: 25 },
      })
    })

    it('если позиция входит в правую границу, то переворачиваем элемент по центру влево', () => {
      const position = { x: 450, y: 250 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'left',
        position: { x: 350, y: 250 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'left',
        position: { x: 350, y: 250 },
      })
    })

    it('если позиция входит в нижнюю правую границу, то переворачиваем элемент вверх и ровняем по правому краю', () => {
      const position = { x: 450, y: 450 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 350, y: 400 },
      })
    })

    it('если позиция входит в нижнюю границу, то переворачиваем элемент вверх и центрируем по горизонтали', () => {
      const position = { x: 250, y: 450 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: 200, y: 400 },
      })
    })

    it('если позиция входит в нижнюю левую границу, то переворачиваем элемент вверх и ровняем по левому краю', () => {
      const position = { x: 50, y: 450 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 50, y: 400 },
      })
    })

    it('если позиция входит в левую границу, то переворачиваем элемент по центру вправо', () => {
      const position = { x: 50, y: 250 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'right',
        position: { x: 50, y: 250 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'right',
        position: { x: 50, y: 250 },
      })
    })

    it('если элемент отровнен по правому краю позиции, то горизонтальные границы равны ширине элемента', () => {
      const position = { x: 100, y: 250 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'right',
        })
      ).toEqual({
        direction: 'right',
        position: { x: 100, y: 250 },
      })
    })
  })

  describe('если тултип спозициронирован относительно элемента', () => {
    it('если якорь входит в верхнюю левую границу, то переворачиваем элемент вниз и ровняем по левому краю', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 0,
        left: 0,
        bottom: 50,
        right: 100,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'downRight',
        position: {
          x: 0,
          y: 55,
        },
      })
    })

    it('если якорь входит в верхнюю границу, то переворачиваем элемент вниз и центрируем по горизонтали', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 0,
        left: 200,
        bottom: 50,
        right: 200,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'downCenter',
        position: {
          x: 200,
          y: 55,
        },
      })
    })

    it('если якорь входит в верхнюю правую границу, то переворачиваем элемент вниз и ровняем по правому краю', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 0,
        right: 0,
        bottom: 50,
        left: 400,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 400, y: 55 },
      })
    })

    it('если якорь входит в правую границу, то переворачиваем элемент по центру влево', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 225,
        right: 500,
        bottom: 225,
        left: 400,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'left',
        position: { x: 295, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'left',
        position: { x: 295, y: 200 },
      })
    })

    it('если якорь входит в нижнюю правую границу, то переворачиваем элемент вверх и ровняем по правому краю', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 450,
        right: 500,
        bottom: 500,
        left: 400,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 400, y: 395 },
      })
    })

    it('если якорь входит в нижнюю границу, то переворачиваем элемент вверх и центрируем по горизонтали', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 400,
        left: 200,
        bottom: 500,
        right: 200,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: 200, y: 395 },
      })
    })

    it('если якорь входит в нижнюю левую границу, то переворачиваем элемент вверх и ровняем по левому краю', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 450,
        right: 400,
        bottom: 500,
        left: 0,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 0, y: 395 },
      })
    })

    it('если позиция входит в левую границу, то переворачиваем элемент по центру вправо', () => {
      const anchorClientRect = {
        ...ANCHOR_SIZE,
        top: 225,
        right: 100,
        bottom: 225,
        left: 0,
      }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'right',
        position: { x: 105, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'right',
        position: { x: 105, y: 200 },
      })
    })
  })
})
