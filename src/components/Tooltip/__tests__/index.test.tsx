import { getAutoDirection } from '../'

const ELEMENT_SIZE = {
  width: 100,
  height: 50,
}

const PARENT_SIZE = {
  width: 500,
  height: 500,
}

describe('getAutoDirection', () => {
  it('если позиция входит в верхнюю левую границу, то переворачиваем элемент вниз вправо', () => {
    const position = { x: 50, y: 50 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'right', vertical: 'bottom' })
  })

  it('если позиция входит в верхнюю границу, то переворачиваем элемент вниз', () => {
    const position = { x: 250, y: 50 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'center', vertical: 'bottom' })
  })

  it('если позиция входит в верхнюю правую границу, то переворачиваем элемент вниз влево', () => {
    const position = { x: 450, y: 25 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'left', vertical: 'bottom' })
  })

  it('если позиция входит в правую границу и элемент отображается вверх, то переворачиваем элемент вверх влево', () => {
    const position = { x: 450, y: 250 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'left', vertical: 'top' })
  })

  it('если позиция входит в правую границу и элемент отображается вниз, то переворачиваем элемент вниз влево', () => {
    const position = { x: 450, y: 250 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'bottom',
      })
    ).toEqual({ horizontal: 'left', vertical: 'bottom' })
  })

  it('если позиция входит в нижнюю правую границу, то переворачиваем элемент вверх влево', () => {
    const position = { x: 450, y: 450 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'left', vertical: 'top' })
  })

  it('если позиция входит в нижнюю границу, то переворачиваем элемент вверх', () => {
    const position = { x: 250, y: 450 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'center', vertical: 'top' })
  })

  it('если позиция входит в нижнюю левую границу, то переворачиваем элемент вверх вправо', () => {
    const position = { x: 50, y: 450 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'right', vertical: 'top' })
  })

  it('если позиция входит в левую границу и элемент отображается вверх, то переворачиваем элемент вверх вправо', () => {
    const position = { x: 50, y: 250 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'top',
      })
    ).toEqual({ horizontal: 'right', vertical: 'top' })
  })

  it('если позиция входит в левую границу и элемент отображается вниз, то переворачиваем элемент вниз вправо', () => {
    const position = { x: 50, y: 250 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'center',
        selectedVerticalDirection: 'bottom',
      })
    ).toEqual({ horizontal: 'right', vertical: 'bottom' })
  })

  it('если элемент отображается слева от позиции, то горизонтальные границы равны ширине элемента', () => {
    const position = { x: 100, y: 250 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'left',
        selectedVerticalDirection: 'center',
      })
    ).toEqual({ horizontal: 'right', vertical: 'center' })
  })

  it('если элемент отображается слева от позиции, то вертикальные границы равны половине высоты элемента', () => {
    const position = { x: 250, y: 50 }

    expect(
      getAutoDirection({
        elementSize: ELEMENT_SIZE,
        parentSize: PARENT_SIZE,
        position,
        selectedHorizontalDirection: 'left',
        selectedVerticalDirection: 'center',
      })
    ).toEqual(undefined)
  })
})
