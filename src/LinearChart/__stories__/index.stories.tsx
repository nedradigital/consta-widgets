import React from 'react'

// import { Text } from '@consta/uikit/Text'
import { getArrayWithRandomInt } from '@consta/widgets-utils/lib/array'
// import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import { boolean, number, object, select, text } from '@storybook/addon-knobs'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { createMetadata, createStory, optionalSelect } from '@/_private/storybook'

import { axes, directionsX, directionsY, LinearChart } from '..'

import docs from './docs.mdx'

const MIN = -2
const MAX = 8
const COUNT_POINTS = 51

const IGNORE_PROPS = ['title', 'directionX', 'directionY'] as const

const colors = {
  first: 'var(--color-bg-success)',
  second: 'var(--color-bg-normal)',
}

const getGridConfig = () =>
  object('gridConfig', {
    x: {
      labels: 'bottom',
      labelTicks: 1,
      gridTicks: 10,
      guide: true,
      withPaddings: false,
    },
    y: {
      labels: 'left',
      labelTicks: 1,
      gridTicks: 4,
      guide: true,
      withPaddings: false,
    },
  } as const)

const getDirectionKnobs = () => ({
  directionX: optionalSelect('directionX', directionsX),
  directionY: optionalSelect('directionY', directionsY),
})

const getCommonProps = () => {
  const now = Date.now()
  const unit = text('unit', 'тыс м3')
  const valueMapper = (y: number, x: number) => ({
    x: now + x * 1000 * 60 * 60 * 24,
    y,
  })

  return {
    ...getDirectionKnobs(),
    lines: [
      {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS - 1).map(valueMapper),
        dots: true,
        lineName: 'Северный бур',
        withGradient: true,
        color: colors.first,
      },
      {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map(valueMapper),
        lineName: 'Южное месторождение',
        color: colors.second,
      },
    ],
    threshold: object('threshold', {
      max: {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => valueMapper(6, x)),
      },
      min: {
        values: getArrayWithRandomInt(MIN, MAX, COUNT_POINTS).map((_, x) => valueMapper(1, x)),
      },
    }),
    gridConfig: getGridConfig(),
    withZoom: true,
    formatValueForLabel: (v: number) => new Date(v).toLocaleDateString(),
    foematValueForTooltip: (v: number) => `${v} ${unit}`,
    formatValueForTooltipTitle: (v: number) => {
      const title = new Date(v)
        .toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
        .replace('г.', '')

      return title[0].toUpperCase() + title.slice(1)
    },
    unit,
  }
}

const decorators = [
  withSmartKnobs({
    ignoreProps: IGNORE_PROPS,
  }),
] as const

const parameters = {
  docs: {
    page: docs,
  },
  environment: {
    style: {
      width: '60vw',
      height: '50vh',
    },
  },
} as const

// export const Horizontal = createStory(
//   () => {
//     return <LinearChart {...getCommonProps()} isHorizontal />
//   },
//   {
//     name: 'горизонтальный',
//     decorators,
//     parameters,
//   }
// )

// export const WithNullData = createStory(
//   () => {
//     return (
//       <LinearChart
//         lines={[
//           {
//             values: [
//               { x: 0, y: null },
//               { x: 1, y: 1 },
//               { x: 2, y: 0 },
//               { x: 3, y: null },
//               { x: 4, y: null },
//               { x: 5, y: 3 },
//               { x: 6, y: null },
//               { x: 7, y: 1 },
//               { x: 8, y: 2 },
//               { x: 9, y: null },
//             ],
//             dots: true,
//             lineName: 'Северный бур',
//             withGradient: true,
//             color: colors.first,
//           },
//         ]}
//         gridConfig={getGridConfig()}
//         formatValueForLabel={String}
//         isHorizontal
//         withZoom
//       />
//     )
//   },
//   {
//     name: 'с пропусками',
//     decorators,
//     parameters,
//   }
// )
//
// export const WithClickHandler = createStory(
//   () => {
//     return (
//       <LinearChart
//         {...getCommonProps()}
//         isHorizontal
//         onClickHoverLine={value => alert(new Date(value))}
//       />
//     )
//   },
//   {
//     name: 'с обработкой клика',
//     decorators,
//     parameters,
//   }
// )

export const LinearChartSimple = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: false,
      },
      y: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'стандартный',
    decorators,
    parameters,
  }
)

export const LinearChartWithDots = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: true,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: false,
      },
      y: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с точками в значениях',
    decorators,
    parameters,
  }
)

export const LinearChartWithHideOY = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: false,
      },
      y: {
        gridTicks: 4,
        showGuide: false,
        showGrid: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'скрытие сетки ординат',
    decorators,
    parameters,
  }
)

export const LinearChartWithHideOX = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        gridTicks: 4,
        showGuide: false,
        showGrid: false,
        withPaddings: false,
      },
      y: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'скрытие сетки абсцисс',
    decorators,
    parameters,
  }
)

export const LinearChartWithPaddings = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        gridTicks: 5,
        showGuide: false,
        withPaddings: true,
      },
      y: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: true,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с отступами внутри',
    decorators,
    parameters,
  }
)

export const LinearChartWithHide1stLabel = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        gridTicks: 5,
        showGuide: false,
        withPaddings: true,
      },
      y: {
        gridTicks: 4,
        showGuide: false,
        withPaddings: true,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} xHideFirstLabel={true} />
  },
  {
    name: 'с пропуском первого лейбла по Ox',
    decorators,
    parameters,
  }
)

export const LinearChartWithMinMax = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: false,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: false,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с min, max по (Ox, Oy)',
    decorators,
    parameters,
  }
)

export const LinearChartWithGuideOX = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с выделением оси Ox',
    decorators,
    parameters,
  }
)

export const LinearChartWithGuideOY = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 6,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с выделением оси Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithGuideAll = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с выделением осей Ox, Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithNull = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 3.5, y: null },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с пропуском значений',
    decorators,
    parameters,
  }
)

export const LinearChartWithDashed = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        dashed: true,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с пунктирной линией',
    decorators,
    parameters,
  }
)

export const LinearChartWithGradient = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: true,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'с градиентом',
    decorators,
    parameters,
  }
)

export const LinearChartWithPercentage = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 0.1 },
          { x: 2, y: 0.2 },
          { x: 3, y: 0.4 },
          { x: 4, y: 0.4 },
          { x: 5, y: 0.3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -0.1,
        max: 0.6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} yLabelsShowInPercent={true} />
  },
  {
    name: 'с % по Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithRotateXLables = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} xLabelsShowVertical={true} />
  },
  {
    name: 'с повёрнутыми лейблами по Ox',
    decorators,
    parameters,
  }
)

export const LinearChartWithUnit = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} yDimensionUnit="г/моль" />
  },
  {
    name: 'с размерностью по Oy',
    decorators,
    parameters,
  }
)

export const LinearChartWithTreshold = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1.5 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    const threshold = {
      max: {
        values: [
          { x: 1, y: 5 },
          { x: 2, y: 4 },
          { x: 3, y: 5 },
          { x: 4, y: 5 },
          { x: 5, y: 5 },
        ],
      },
      min: {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 4, y: 1 },
          { x: 5, y: 1 },
        ],
      },
    }

    return <LinearChart lines={lines} gridConfig={gridConfig} threshold={threshold} />
  },
  {
    name: 'с пределами',
    decorators,
    parameters,
  }
)

export const LinearChartWithLegend = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 3 },
        ],
        dots: false,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
      {
        values: [
          { x: 0, y: 2 },
          { x: 1, y: 4 },
          { x: 3, y: 5 },
        ],
        dots: false,
        lineName: 'Южная нора',
        withGradient: false,
        color: colors.second,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 8,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    const legendData = [
      {
        color: colors.first,
        text: 'Успех',
      },
      {
        color: colors.second,
        text: 'Болъ',
      },
    ]

    return <LinearChart lines={lines} gridConfig={gridConfig} legend={legendData} />
  },
  {
    name: 'с легендой',
    decorators,
    parameters,
  }
)

export const LinearChartWithValues = createStory(
  () => {
    const lines = [
      {
        values: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
        ],
        dots: false,
        showValues: true,
        lineName: 'Северный бур',
        withGradient: false,
        color: colors.first,
      },
    ]

    const gridConfig = {
      x: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
      y: {
        min: -1,
        max: 6,
        gridTicks: 6,
        showGuide: true,
        withPaddings: false,
      },
    }
    return <LinearChart lines={lines} gridConfig={gridConfig} />
  },
  {
    name: 'со значениями',
    decorators,
    parameters,
  }
)

//
// const renderTitle = (defaultText: string = '') => {
//   const title = text('title', defaultText)
//
//   return title ? (
//     <Text as="div" view="primary" size="m">
//       {title}
//     </Text>
//   ) : null
// }
//

export default createMetadata({
  title: 'components/LinearChart',
})
