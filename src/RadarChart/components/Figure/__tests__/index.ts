import { CENTER_POINT, divideBySegments } from '@/RadarChart/components/Figure'

describe('divideBySegments', () => {
  it('если пропусков нет, возвращает 1 цельный сегмент', () => {
    const points = [
      {
        xPercent: 90,
        yPercent: 90,
        label: '9',
        axisName: 'Сила',
        originalValue: 9,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: '0',
        axisName: 'Выносливость',
        originalValue: 0,
      },
      {
        xPercent: 70,
        yPercent: 70,
        label: '7',
        axisName: 'Прибыльность',
        originalValue: 7,
      },
      {
        xPercent: 60,
        yPercent: 60,
        label: '6',
        axisName: 'Мобильность',
        originalValue: 6,
      },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points,
      },
    ])
  })

  it('если есть пропуск между значениями, возвращает 2 сплошных сегмента с первой точкой в конце и 1 пунктирный посередине', () => {
    const points = [
      {
        xPercent: 90,
        yPercent: 90,
        label: '9',
        axisName: 'Сила',
        originalValue: 9,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: '0',
        axisName: 'Выносливость',
        originalValue: 0,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 70,
        yPercent: 70,
        label: '7',
        axisName: 'Прибыльность',
        originalValue: 7,
      },
      {
        xPercent: 60,
        yPercent: 60,
        label: '6',
        axisName: 'Мобильность',
        originalValue: 6,
      },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points: [
          {
            xPercent: 90,
            yPercent: 90,
            label: '9',
            axisName: 'Сила',
            originalValue: 9,
          },
          {
            xPercent: 50,
            yPercent: 50,
            label: '0',
            axisName: 'Выносливость',
            originalValue: 0,
          },
        ],
      },
      {
        type: 'dashed',
        points: [
          {
            xPercent: 50,
            yPercent: 50,
            label: '0',
            axisName: 'Выносливость',
            originalValue: 0,
          },
          CENTER_POINT,
          {
            xPercent: 70,
            yPercent: 70,
            label: '7',
            axisName: 'Прибыльность',
            originalValue: 7,
          },
        ],
      },
      {
        type: 'solid',
        points: [
          {
            xPercent: 70,
            yPercent: 70,
            label: '7',
            axisName: 'Прибыльность',
            originalValue: 7,
          },
          {
            xPercent: 60,
            yPercent: 60,
            label: '6',
            axisName: 'Мобильность',
            originalValue: 6,
          },
          {
            xPercent: 90,
            yPercent: 90,
            label: '9',
            axisName: 'Сила',
            originalValue: 9,
          },
        ],
      },
    ])
  })

  it('если пропуск между одиночными значениями, возвращает 1 пунктирный и 1 сплошной сегмент', () => {
    const points = [
      {
        xPercent: 50,
        yPercent: 50,
        label: '0',
        axisName: 'Выносливость',
        originalValue: 0,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 70,
        yPercent: 70,
        label: '7',
        axisName: 'Прибыльность',
        originalValue: 7,
      },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'dashed',
        points: [
          {
            xPercent: 50,
            yPercent: 50,
            label: '0',
            axisName: 'Выносливость',
            originalValue: 0,
          },
          CENTER_POINT,
          {
            xPercent: 70,
            yPercent: 70,
            label: '7',
            axisName: 'Прибыльность',
            originalValue: 7,
          },
        ],
      },
      {
        type: 'solid',
        points: [
          {
            xPercent: 70,
            yPercent: 70,
            label: '7',
            axisName: 'Прибыльность',
            originalValue: 7,
          },
          {
            xPercent: 50,
            yPercent: 50,
            label: '0',
            axisName: 'Выносливость',
            originalValue: 0,
          },
        ],
      },
    ])
  })

  it('если есть 2 пропуска подряд, объединяет их, возвращая вставляя посередине точку начала координат', () => {
    const points = [
      {
        xPercent: 90,
        yPercent: 90,
        label: '9',
        axisName: 'Сила',
        originalValue: 9,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: '0',
        axisName: 'Выносливость',
        originalValue: 0,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 60,
        yPercent: 60,
        label: '6',
        axisName: 'Мобильность',
        originalValue: 6,
      },
      {
        xPercent: 70,
        yPercent: 70,
        label: '7',
        axisName: 'Прибыльность',
        originalValue: 7,
      },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points: [
          {
            xPercent: 90,
            yPercent: 90,
            label: '9',
            axisName: 'Сила',
            originalValue: 9,
          },
          {
            xPercent: 50,
            yPercent: 50,
            label: '0',
            axisName: 'Выносливость',
            originalValue: 0,
          },
        ],
      },
      {
        type: 'dashed',
        points: [
          {
            xPercent: 50,
            yPercent: 50,
            label: '0',
            axisName: 'Выносливость',
            originalValue: 0,
          },
          CENTER_POINT,
          {
            xPercent: 60,
            yPercent: 60,
            label: '6',
            axisName: 'Мобильность',
            originalValue: 6,
          },
        ],
      },
      {
        type: 'solid',
        points: [
          {
            xPercent: 60,
            yPercent: 60,
            label: '6',
            axisName: 'Мобильность',
            originalValue: 6,
          },
          {
            xPercent: 70,
            yPercent: 70,
            label: '7',
            axisName: 'Прибыльность',
            originalValue: 7,
          },
          {
            xPercent: 90,
            yPercent: 90,
            label: '9',
            axisName: 'Сила',
            originalValue: 9,
          },
        ],
      },
    ])
  })

  it('объединяет пропуски в начале и конце, возвращая 1 сплошной и 1 пунктирный сегмент', () => {
    const points = [
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 90,
        yPercent: 90,
        label: '9',
        axisName: 'Сила',
        originalValue: 9,
      },
      {
        xPercent: 60,
        yPercent: 60,
        label: '6',
        axisName: 'Мобильность',
        originalValue: 6,
      },
      {
        xPercent: 70,
        yPercent: 70,
        label: '7',
        axisName: 'Прибыльность',
        originalValue: 7,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'solid',
        points: [
          {
            xPercent: 90,
            yPercent: 90,
            label: '9',
            axisName: 'Сила',
            originalValue: 9,
          },
          {
            xPercent: 60,
            yPercent: 60,
            label: '6',
            axisName: 'Мобильность',
            originalValue: 6,
          },
          {
            xPercent: 70,
            yPercent: 70,
            label: '7',
            axisName: 'Прибыльность',
            originalValue: 7,
          },
        ],
      },
      {
        type: 'dashed',
        points: [
          {
            xPercent: 70,
            yPercent: 70,
            label: '7',
            axisName: 'Прибыльность',
            originalValue: 7,
          },
          CENTER_POINT,
          {
            xPercent: 90,
            yPercent: 90,
            label: '9',
            axisName: 'Сила',
            originalValue: 9,
          },
        ],
      },
    ])
  })

  it('возвращает пустой массив, если всё пропуски', () => {
    const points = [
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
    ] as const

    expect(divideBySegments(points)).toEqual([])
  })

  it('возвращает 1 пунктирный сегмент из начала координат и 1 точки, если есть только 1 точка со значением', () => {
    const points = [
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 60,
        yPercent: 60,
        label: '6',
        axisName: 'Мобильность',
        originalValue: 6,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
      {
        xPercent: 50,
        yPercent: 50,
        label: null,
        axisName: '',
        originalValue: null,
      },
    ] as const

    expect(divideBySegments(points)).toEqual([
      {
        type: 'dashed',
        points: [
          CENTER_POINT,
          {
            xPercent: 60,
            yPercent: 60,
            label: '6',
            axisName: 'Мобильность',
            originalValue: 6,
          },
        ],
      },
    ])
  })
})
