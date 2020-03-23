import { getComputedPositionAndDirection, getIsInBorders } from '@/components/Tooltip/helpers'

const PARENT_SIZE = {
  width: 500,
  height: 500,
}

const ANCHOR_SIZE = {
  width: 100,
  height: 50,
}

describe('getIsInBorders', () => {
  describe('если тултип спозициронирован относительно координат', () => {
    it('определяет, хватает ли тултипу места сверху', () => {
      const position = { x: 150, y: 150 }
      const tooltipSize = { width: 100, height: 149 }

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        top: false,
        left: false,
        bottom: false,
        horizontal: false,
        right: false,
        vertical: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        top: true,
        left: false,
        bottom: false,
        horizontal: false,
        right: false,
        vertical: false,
      })
    })

    it('определяет, хватает ли тултипу места снизу', () => {
      const position = { x: 350, y: 350 }
      const tooltipSize = { width: 100, height: 149 }

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        bottom: false,
        top: false,
        left: false,
        horizontal: false,
        right: false,
        vertical: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        bottom: true,
        top: false,
        left: false,
        horizontal: false,
        right: false,
        vertical: false,
      })
    })

    it('определяет, хватает ли тултипу места слева', () => {
      const position = { x: 150, y: 150 }
      const tooltipSize = { width: 149, height: 100 }

      expect(getIsInBorders({ position, tooltipSize, parentSize: PARENT_SIZE })).toEqual({
        left: false,
        top: false,
        bottom: false,
        horizontal: false,
        right: false,
        vertical: false,
      })

      expect(getIsInBorders({ position, tooltipSize, parentSize: PARENT_SIZE, offset: 1 })).toEqual(
        {
          left: true,
          top: false,
          bottom: false,
          horizontal: false,
          right: false,
          vertical: false,
        }
      )
    })

    it('определяет, хватает ли тултипу места справа', () => {
      const position = { x: 350, y: 350 }
      const tooltipSize = { width: 149, height: 100 }

      expect(getIsInBorders({ position, tooltipSize, parentSize: PARENT_SIZE })).toEqual({
        right: false,
        left: false,
        top: false,
        bottom: false,
        horizontal: false,
        vertical: false,
      })

      expect(getIsInBorders({ position, tooltipSize, parentSize: PARENT_SIZE, offset: 1 })).toEqual(
        {
          right: true,
          left: false,
          top: false,
          bottom: false,
          horizontal: false,
          vertical: false,
        }
      )
    })

    it('определяет, хватает ли тултипу места с нескольких сторон', () => {
      const position = { x: 250, y: 250 }

      expect(
        getIsInBorders({
          position,
          tooltipSize: { width: 250, height: 100 },
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        horizontal: true,
        right: true,
        left: true,
        vertical: false,
        top: false,
        bottom: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize: { width: 100, height: 250 },
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        vertical: true,
        bottom: true,
        top: true,
        horizontal: false,
        right: false,
        left: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize: { width: 250, height: 250 },
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        horizontal: true,
        right: true,
        left: true,
        vertical: true,
        top: true,
        bottom: true,
      })
    })
  })

  describe('если тултип спозициронирован относительно якоря', () => {
    it('определяет, хватает ли тултипу места сверху', () => {
      const position = { x: 150, y: 150 }
      const tooltipSize = { width: 100, height: 99 }

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        top: false,
        left: false,
        bottom: false,
        horizontal: false,
        right: false,
        vertical: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        top: true,
        left: false,
        bottom: false,
        horizontal: false,
        right: false,
        vertical: false,
      })
    })

    it('определяет, хватает ли тултипу места снизу', () => {
      const position = { x: 250, y: 350 }
      const tooltipSize = { width: 50, height: 149 }

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        bottom: false,
        top: false,
        left: false,
        right: false,
        horizontal: false,
        vertical: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        bottom: true,
        top: false,
        left: false,
        horizontal: false,
        right: false,
        vertical: false,
      })
    })

    it('определяет, хватает ли тултипу места слева', () => {
      const position = { x: 150, y: 250 }
      const tooltipSize = { width: 149, height: 100 }

      expect(
        getIsInBorders({ position, tooltipSize, anchorSize: ANCHOR_SIZE, parentSize: PARENT_SIZE })
      ).toEqual({
        left: false,
        top: false,
        bottom: false,
        horizontal: false,
        right: false,
        vertical: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        left: true,
        top: false,
        bottom: false,
        horizontal: false,
        right: false,
        vertical: false,
      })
    })

    it('определяет, хватает ли тултипу места справа', () => {
      const position = { x: 250, y: 250 }
      const tooltipSize = { width: 149, height: 100 }

      expect(
        getIsInBorders({ position, tooltipSize, anchorSize: ANCHOR_SIZE, parentSize: PARENT_SIZE })
      ).toEqual({
        right: false,
        left: false,
        top: false,
        bottom: false,
        horizontal: false,
        vertical: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize,
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        right: true,
        left: false,
        top: false,
        bottom: false,
        horizontal: false,
        vertical: false,
      })
    })

    it('определяет, хватает ли тултипу места с нескольких сторон', () => {
      const position = { x: 250, y: 250 }

      expect(
        getIsInBorders({
          position,
          tooltipSize: { width: 250, height: 100 },
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        horizontal: true,
        right: true,
        left: true,
        vertical: false,
        top: false,
        bottom: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize: { width: 100, height: 250 },
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
        })
      ).toEqual({
        vertical: true,
        bottom: true,
        top: true,
        horizontal: false,
        right: false,
        left: false,
      })

      expect(
        getIsInBorders({
          position,
          tooltipSize: { width: 250, height: 250 },
          anchorSize: ANCHOR_SIZE,
          parentSize: PARENT_SIZE,
          offset: 1,
        })
      ).toEqual({
        horizontal: true,
        right: true,
        left: true,
        vertical: true,
        top: true,
        bottom: true,
      })
    })
  })
})

describe('getComputedPositionAndDirection', () => {
  const ELEMENT_SIZE = {
    width: 100,
    height: 50,
  }

  const ANCHOR_OFFSET = 5

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

    it('если позиция входит в верхнюю границу, то переворачиваем элемент вниз', () => {
      const position = { x: 250, y: 50 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'left',
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 150, y: 50 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'right',
        })
      ).toEqual({
        direction: 'downRight',
        position: { x: 250, y: 50 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 150, y: 50 },
      })

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

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'downRight',
        position: { x: 250, y: 50 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 150, y: 50 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downCenter',
        })
      ).toEqual({
        direction: 'downCenter',
        position: { x: 200, y: 50 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'downRight',
        position: { x: 250, y: 50 },
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

    it('если позиция входит в правую границу, то переворачиваем элемент влево', () => {
      const position = { x: 450, y: 250 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 350, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 350, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 350, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'left',
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
          direction: 'right',
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
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'downLeft',
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
        direction: 'downLeft',
        position: { x: 350, y: 250 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'downLeft',
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

    it('если позиция входит в нижнюю границу, то переворачиваем элемент вверх', () => {
      const position = { x: 250, y: 450 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'left',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 150, y: 400 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'right',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 250, y: 400 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 150, y: 400 },
      })

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

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 250, y: 400 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 150, y: 400 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: 200, y: 400 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 250, y: 400 },
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

    it('если позиция входит в левую границу, то переворачиваем элемент вправо', () => {
      const position = { x: 50, y: 250 }

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'left',
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
          direction: 'right',
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
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 50, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 50, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 50, y: 200 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'downRight',
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
        direction: 'downRight',
        position: { x: 50, y: 250 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          position,
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'downRight',
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

    it('если якорь входит в верхнюю границу, то переворачиваем элемент вниз', () => {
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
          direction: 'left',
        })
      ).toEqual({
        direction: 'downLeft',
        position: {
          x: 200,
          y: 55,
        },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'right',
        })
      ).toEqual({
        direction: 'downRight',
        position: {
          x: 200,
          y: 55,
        },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'downLeft',
        position: {
          x: 200,
          y: 55,
        },
      })

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

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'downRight',
        position: {
          x: 200,
          y: 55,
        },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'downLeft',
        position: {
          x: 200,
          y: 55,
        },
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
        direction: 'downCenter',
        position: {
          x: 200,
          y: 55,
        },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'downRight',
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

    it('если якорь входит в правую границу, то переворачиваем элемент влево', () => {
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
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 400, y: 120 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 400, y: 120 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 400, y: 120 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'left',
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
          direction: 'right',
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
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 400, y: 230 },
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
        direction: 'downLeft',
        position: { x: 400, y: 230 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'downLeft',
        position: { x: 400, y: 230 },
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

    it('если якорь входит в нижнюю границу, то переворачиваем элемент вверх', () => {
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
          direction: 'left',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 200, y: 395 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'right',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 200, y: 395 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 200, y: 395 },
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
        direction: 'upCenter',
        position: { x: 200, y: 395 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 200, y: 395 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'upLeft',
        position: { x: 200, y: 395 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upCenter',
        position: { x: 200, y: 395 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'upRight',
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

    it('если позиция входит в левую границу, то переворачиваем элемент вправо', () => {
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
          direction: 'left',
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
          direction: 'right',
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
          direction: 'upLeft',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 0, y: 120 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upCenter',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 0, y: 120 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'upRight',
        })
      ).toEqual({
        direction: 'upRight',
        position: { x: 0, y: 120 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downLeft',
        })
      ).toEqual({
        direction: 'downRight',
        position: { x: 0, y: 230 },
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
        direction: 'downRight',
        position: { x: 0, y: 230 },
      })

      expect(
        getComputedPositionAndDirection({
          tooltipSize: ELEMENT_SIZE,
          parentSize: PARENT_SIZE,
          offset: ANCHOR_OFFSET,
          anchorClientRect,
          direction: 'downRight',
        })
      ).toEqual({
        direction: 'downRight',
        position: { x: 0, y: 230 },
      })
    })
  })
})
