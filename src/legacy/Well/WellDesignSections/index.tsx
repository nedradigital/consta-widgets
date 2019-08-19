/* tslint:disable */
import * as React from 'react'
import classNames from 'classnames'
import isNil from 'lodash/isNil'
import { data as SVGData } from './svg-data'

import typedCSS from './index.css'

const css = (typedCSS as any) as { [index: string]: string }

export const voidTypes = [
  'FRACTURED',
  'FRACTURED_VUGGY',
  'FRACTURED_POROUS',
  'FRACTURED_POROUS_VUGGY',
] as const
export const objectives = ['EXPLORATION', 'ZBS'] as const
export const stageKinds = ['SH', 'SK', 'SP', 'SE', 'SN'] as const

type WellDesignSectionsProps = {
  className?: string
  geology?: {
    gnk?: boolean
    vnk?: boolean
    voidType?: typeof voidTypes[number]
    objective?: typeof objectives[number]
    collectorType?: any
  }
  technology?: {
    fbCount?: number
    mgrpCount?: number
  }
  sections: Array<{
    stageKind: typeof stageKinds[number]
    stageNum: number
    hasTool?: boolean
    drillingEnd?: boolean
  }>
}

const MAIN_CLASS = 'well-design'
const MAIN_CLASS_SVG = `${MAIN_CLASS}__svg`

export const WellDesignSections: React.FC<WellDesignSectionsProps> = ({
  className,
  sections,
  geology,
  technology,
}) => {
  const { gnk, vnk, voidType, objective, collectorType } = geology || ({} as const)

  const { fbCount, mgrpCount } = technology || ({} as const)

  const tailSections = sections
    .filter((section: { stageKind: string }) => section.stageKind === 'SH')
    .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) => {
      return sectionA.stageNum > sectionB.stageNum
        ? 1
        : sectionA.stageNum < sectionB.stageNum
        ? -1
        : 0
    })

  const motherboreSections = sections
    .filter(
      (section: { stageKind: string }) =>
        section.stageKind === 'SN' ||
        section.stageKind === 'SK' ||
        section.stageKind === 'SP' ||
        section.stageKind === 'SE' ||
        section.stageKind === 'SH'
    )
    .filter(
      (section: { stageKind: string; stageNum: any }) =>
        section.stageKind !== 'SH' ||
        (!tailSections.length || section.stageNum === tailSections[0].stageNum)
    )
    .slice(0, 7) //Show 7 main sections maximum
    .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) => {
      return sectionA.stageNum > sectionB.stageNum
        ? 1
        : sectionA.stageNum < sectionB.stageNum
        ? -1
        : 0
    })

  const PilotSections = sections
    .filter((section: { stageKind: string }) => section.stageKind === 'PU')
    .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) =>
      sectionA.stageNum > sectionB.stageNum ? 1 : sectionA.stageNum < sectionB.stageNum ? -1 : 0
    )

  const additionalSections = sections
    .filter(
      (section: { stageKind: string; stageNum: any }) =>
        section.stageKind === 'FB' ||
        section.stageKind === 'OS' ||
        (section.stageKind === 'SH' &&
          tailSections.length &&
          section.stageNum !== tailSections[0].stageNum)
    )
    .slice(0, 9) //Show 6 additional sections or 9 fishbones maximum
    .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) =>
      sectionA.stageNum > sectionB.stageNum ? 1 : sectionA.stageNum < sectionB.stageNum ? -1 : 0
    )

  //const motherboreSectionsdrillingEnd = true;

  //[9..1]//
  const fishBones = [
    'M620 493.164c2.897-23.321 9.659-20.969 62.877-11.335', //1
    'M571.284 491c-2.684 20.278 4.427 19.902 58.303 24.397', //2
    'M524.427 482.878c3.083-23.297 9.825-20.892 62.965-10.834', //3
    'M476.284 481c-2.684 20.278 4.427 19.902 58.303 24.397', //4
    'M428.427 473.878c3.083-23.297 9.825-20.892 62.965-10.834', //5
    'M380.284 471c-2.684 20.278 4.427 19.902 58.303 24.397', //6
    'M333.427 462.878c3.083-23.297 9.825-20.892 62.965-10.834', //7
    'M287.914 458.763c-4.979 19.84 2.129 20.277 55.14 30.889', //8
    'M246.975 441.468c4.589-18.851 11.098-15.992 62.98-.814', //9
  ].reverse()

  //[2..7]
  const additionalSectionsArray = [
    'M684 529.5c-127.596-12.566-200.863-19.143-344-35.5-35-4-57.361-34.543-107-56.833',
    'M684 470.5C556.404 457.934 347.5 436 317 433s-37 20-84 4.166',
    'M684 510.5c-127.596-12.566-200.863-19.143-344-35.5-35-4-57.361-15.543-107-37.833',
    'M684 480.5C556.404 467.934 347.5 446 317 443s-37 10-84-5.833',
    'M684 490.5C556.404 477.934 317 453 317 453s-62-5.5-84-15.833',
    'M684 520.5c-127.596-12.566-200.863-19.143-344-35.5-35-4-57.361-25.543-107-47.833',
  ]

  const fishBonesRender =
    !isNil(fbCount) && fbCount > 0
      ? fishBones.splice(fbCount, fishBones.length - fbCount) && fishBones
      : false

  const mgrpArray = [
    //up 1
    'M673.62 488.579l-7.145-.677-2.306-.192 3.738-1.475-.482-7.032 1.837-4.982-1.27-7.199 4.92 7.317-.904 4.934 1.619 7.256 3.296 2.471-3.303-.421z' +
      //down 1
      'M668.38 509.421l7.145.677 2.306.192-3.738 1.475.482 7.032-1.837 4.982 1.27 7.199-4.92-7.317.904-4.934-1.619-7.256-3.296-2.471 3.303.421z',

    //down 2
    'M615.38 503.421l7.145.677 2.306.192-3.738 1.475.482 7.032-1.837 4.982 1.27 7.199-4.92-7.317.904-4.934-1.619-7.256-3.296-2.471 3.303.421z' +
      //up 2
      'M620.62 483.579l-7.145-.677-2.306-.192 3.738-1.475-.482-7.032 1.837-4.982-1.27-7.199 4.92 7.317-.904 4.934 1.619 7.256 3.296 2.471-3.303-.421z',

    //down 3
    'M562.38 497.421l7.145.677 2.306.192-3.738 1.475.482 7.032-1.837 4.982 1.27 7.199-4.92-7.317.904-4.934-1.619-7.256-3.296-2.471 3.303.421z' +
      //up 3
      'M567.62 478.579l-7.145-.677-2.306-.192 3.738-1.475-.482-7.032 1.837-4.982-1.27-7.199 4.92 7.317-.904 4.934 1.619 7.256 3.296 2.471-3.303-.421z',

    //down 4
    'M509.38 491.421l7.145.677 2.306.192-3.738 1.475.482 7.032-1.837 4.982 1.27 7.199-4.92-7.317.904-4.934-1.619-7.256-3.296-2.471 3.303.421z' +
      //up 4
      'M514.62 473.579l-7.145-.677-2.306-.192 3.738-1.475-.482-7.032 1.837-4.982-1.27-7.199 4.92 7.317-.904 4.934 1.619 7.256 3.296 2.471-3.303-.421z',

    //down 5
    'M456.38 485.421l7.145.677 2.306.192-3.738 1.475.482 7.032-1.837 4.982 1.27 7.199-4.92-7.317.904-4.934-1.619-7.256-3.296-2.471 3.303.421z' +
      //up 5
      'M461.62 468.579l-7.145-.677-2.306-.192 3.738-1.475-.482-7.032 1.837-4.982-1.27-7.199 4.92 7.317-.904 4.934 1.619 7.256 3.296 2.471-3.303-.421z',

    //down 6
    'M402.38 479.821l7.145.677 2.306.192-3.738 1.474.482 7.032-1.837 4.983 1.27 7.199-4.92-7.317.904-4.934-1.619-7.256-3.296-2.471 3.303.421z' +
      //up 6
      'M408.479 463.104l-7.145-.677-2.306-.192 3.738-1.475-.481-7.032 1.837-4.982-1.271-7.199 4.92 7.317-.904 4.934 1.619 7.256 3.297 2.471-3.304-.421z',
  ]

  const SectionArray = [
    [
      'M95.5598 215.386C95.5598 220.438 95.2226 225.119 95.5597 235.865C98.2412 321.366 138.5 387 203.5 422.5C213.789 428.119 223.665 432.975 233 437.167C282.639 459.458 317 463 317 463C317 463 556.405 487.934 684 500.5',
    ],
    [
      'M95.5598 215.386C95.5598 220.438 95.2226 225.119 95.5597 235.865C98.2412 321.366 138.5 387 203.5 422.5C213.789 428.119 223.665 432.975 233 437.167',
      'M684 500.5C556.404 487.934 317 463 317 463C317 463 282.639 459.457 233 437.167',
    ],
    [
      'M95.5598 215.386C95.5598 220.438 95.2226 225.119 95.5597 235.865C98.2412 321.366 138.5 387 203.5 422.5',
      'M203.5 422.5C209.306 425.671 214.98 428.599 220.5 431.301C224.762 433.388 228.932 435.34 233 437.167C282.639 459.458 317 463 317 463C317 463 377.035 469.253 453 477.074',
      'M684 500.5C620.3 494.227 528.733 484.871 453 477.074',
    ],
    [
      'M95.5598 215.386C95.5598 220.438 95.2226 225.119 95.5597 235.865C97.1365 286.142 111.707 329.55 136.66 364',
      'M233 437.167C223.665 432.975 213.789 428.119 203.5 422.5C176.722 407.875 154.143 388.136 136.66 364',
      'M233 437.167C282.639 459.457 317 463 317 463C317 463 374.417 468.98 448 476.559',
      'M684 500.5C618.891 494.088 524.67 484.455 448 476.559',
    ],
    [
      'M95.5598 215.386C95.5598 220.438 95.2226 225.119 95.5597 235.865C96.8173 275.967 106.341 311.698 122.807 342',
      'M233 437.167C223.665 432.975 213.789 428.119 203.5 422.5C168.986 403.65 141.448 376.305 122.807 342',
      'M233 437.167C282.639 459.457 317 463 317 463C317 463 347.261 466.152 392 470.779',
      'M546.5 486.659C490.964 480.994 434.843 475.21 392 470.779',
      'M684 500.5C645.211 496.68 596.088 491.717 546.5 486.659',
    ],
    [
      'M95.5598 215.386C95.5598 220.438 95.2226 225.119 95.5597 235.865C96.9442 280.011 108.346 318.86 127.999 351',
      'M203.5 422.5C172.061 405.329 146.409 381.109 127.999 351',
      'M203.5 422.5C209.306 425.671 214.98 428.599 220.5 431.301C224.762 433.388 228.932 435.34 233 437.167C282.639 459.458 317 463 317 463',
      'M317 463C317 463 377.035 469.253 453 477.074',
      'M453 477.074C490.55 480.94 531.992 485.189 572 489.255',
      'M684 500.5C651.884 497.337 612.683 493.391 572 489.255',
    ],
    [
      'M95.5598 215.386C95.5598 220.438 95.2226 225.119 95.5597 235.865C96.3313 260.47 100.215 283.43 106.905 304.5',
      'M136.66 364C123.919 346.409 113.884 326.483 106.905 304.5',
      'M233 437.167C223.665 432.975 213.789 428.119 203.5 422.5C176.722 407.875 154.143 388.136 136.66 364',
      'M317 463C317 463 282.639 459.457 233 437.167',
      'M317 463C317 463 374.417 468.98 448 476.559',
      'M448 476.559C486.386 480.512 529.171 484.901 570.5 489.103',
      'M684 500.5C651.489 497.298 611.719 493.293 570.5 489.103',
    ],
  ]

  const bitRotates: { [index: string]: any } = {
    main: [
      //default value
      '-84.17 551.842 497.679',

      //Section count: 1
      [
        //'-8.17 345.842 514.679'
      ],

      //Section count: 2
      ['-8.17 345.842 514.679'],

      //Section count: 3
      ['-12.17 345.842 514.679'],

      //Section count: 4
      ['-8.17 345.842 514.679', '-60.17 551.842 497.679'],

      //Section count: 5
      ['-8.17 345.842 514.679', '-60.17 551.842 497.679'],

      //Section count: 6
      ['-8.17 345.842 514.679', '-60.17 551.842 497.679', '-70.17 551.842 497.679'],

      //Section count: 7
      [
        '-4.17 345.842 514.679',
        '-39.17 551.842 497.679',
        '-64.17 551.842 497.679',
        '-74.17 551.842 497.679',
      ],
    ],
    additional: [],
    fishbones: [],
    pilot: [
      [
        '-8.17 345.842 514.679', //1
        '-8.17 345.842 514.679', //2
      ],
    ],
  }

  //Rende bit with rotation
  function renderBit(type: string, sectionCount: string | number, index: string | number) {
    const rotate =
      typeof bitRotates[type][sectionCount] !== 'undefined' &&
      typeof bitRotates[type][sectionCount][index] !== 'undefined'
        ? bitRotates[type][sectionCount][index]
        : bitRotates['main'][0]

    const bitIndex = type + '-' + sectionCount + '-' + index

    return [
      '<g filter="url(#well_bitrotate)" class="' + css[`${MAIN_CLASS}__bit`] + '">',
      '<path',
      '  transform="rotate(' + rotate + ')"',
      '  fill="url(#well_bitimg)"',
      '  d="M551.842 497.679h22v15h-22z"',
      '  key="' + bitIndex + '"',
      '/>',
      '</g>',
    ].join(' ')
  }

  const mgrpRender =
    !isNil(mgrpCount) && mgrpCount > 0
      ? mgrpArray.splice(mgrpCount, mgrpArray.length - mgrpCount) && mgrpArray.join('')
      : false

  const isFractured =
    (!isNil(voidType) && voidType == 'FRACTURED') ||
    voidType == 'FRACTURED_VUGGY' ||
    voidType == 'FRACTURED_POROUS' ||
    voidType == 'FRACTURED_POROUS_VUGGY'

  return (
    <div
      className={classNames(
        MAIN_CLASS,
        className,
        css[`${MAIN_CLASS}__objective-${objective}`],
        css[`${MAIN_CLASS}__voidtype-${voidType}`],
        css[`${MAIN_CLASS}__collectortype-${collectorType}`],
        {
          [css[`${MAIN_CLASS}__well-gnk`]]: gnk,
          [css[`${MAIN_CLASS}__well-vnk`]]: vnk,
          [css[`${MAIN_CLASS}__well-mgrp`]]: mgrpCount,
          [css[`${MAIN_CLASS}__well-fb ${MAIN_CLASS}__well-fb-${fbCount}`]]: fbCount,
        }
      )}
    >
      <svg
        width={1080}
        height={595}
        viewBox="0 0 1080 595"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={classNames(`${MAIN_CLASS_SVG}-container`)}
      >
        <defs>
          <filter
            id="prefix__filter0_ii"
            x={12.038}
            y={351.489}
            width={689.962}
            height={227.061}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx={-7.962} dy={-12.511} />
            <feGaussianBlur stdDeviation={40.946} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix values="0 0 0 0 0.305677 0 0 0 0 0.0667417 0 0 0 0 0.260595 0 0 0 0.6 0" />
            <feBlend in2="shape" result="effect1_innerShadow" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={4.55} />
            <feGaussianBlur stdDeviation={12.511} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix values="0 0 0 0 0.20524 0 0 0 0 0.0492935 0 0 0 0 0.173176 0 0 0 0.5 0" />
            <feBlend in2="effect1_innerShadow" result="effect2_innerShadow" />
          </filter>
          <pattern
            id="prefix__pattern0"
            patternContentUnits="objectBoundingBox"
            width={0.352}
            height={0.762}
          >
            <use xlinkHref="#prefix__image0" transform="scale(.00117 .00381)" />
          </pattern>
          <filter
            id="prefix__filter1_ii"
            x={694.038}
            y={351.489}
            width={118.962}
            height={227.061}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx={-7.962} dy={-12.511} />
            <feGaussianBlur stdDeviation={40.946} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix values="0 0 0 0 0.305677 0 0 0 0 0.0667417 0 0 0 0 0.260595 0 0 0 0.6 0" />
            <feBlend in2="shape" result="effect1_innerShadow" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={4.55} />
            <feGaussianBlur stdDeviation={12.511} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix values="0 0 0 0 0.20524 0 0 0 0 0.0492935 0 0 0 0 0.173176 0 0 0 0.5 0" />
            <feBlend in2="effect1_innerShadow" result="effect2_innerShadow" />
          </filter>
          <pattern
            id="prefix__pattern1"
            patternContentUnits="objectBoundingBox"
            width={1.27}
            height={0.448}
          >
            <use xlinkHref="#prefix__image0" transform="scale(.00423 .00224)" />
          </pattern>
          <filter
            id="prefix__filter2_i"
            x={20}
            y={361}
            width={793}
            height={98}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={-3} />
            <feGaussianBlur stdDeviation={6.5} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix values="0 0 0 0 0.54902 0 0 0 0 0.0509804 0 0 0 0 0.458824 0 0 0 0.38 0" />
            <feBlend in2="shape" result="effect1_innerShadow" />
          </filter>
          <filter
            id="prefix__filter3_d"
            x={130.113}
            y={376.876}
            width={580.887}
            height={78.124}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy={6} />
            <feGaussianBlur stdDeviation={4.5} />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <filter
            id="prefix__filter4_d"
            x={11}
            y={385}
            width={142}
            height={38}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy={6} />
            <feGaussianBlur stdDeviation={4.5} />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <filter
            id="prefix__filter5_d"
            x={693}
            y={361}
            width={129}
            height={94.001}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy={6} />
            <feGaussianBlur stdDeviation={4.5} />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <filter
            id="prefix__filter6_d"
            x={88.5}
            y={397.433}
            width={74.29}
            height={68.626}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation={12.5} />
            <feColorMatrix values="0 0 0 0 0.283843 0 0 0 0 0.742183 0 0 0 0 1 0 0 0 0.94 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <pattern
            id="prefix__pattern2"
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          >
            <use xlinkHref="#prefix__image1" transform="matrix(.00126 0 0 .00186 -.71 -.531)" />
          </pattern>
          <filter
            id="prefix__filter7_d"
            x={112.236}
            y={407.952}
            width={74.826}
            height={69.593}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation={12.5} />
            <feColorMatrix values="0 0 0 0 0.283843 0 0 0 0 0.742183 0 0 0 0 1 0 0 0 0.94 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <pattern
            id="prefix__pattern3"
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          >
            <use xlinkHref="#prefix__image1" transform="matrix(.00126 0 0 .00186 -.71 -.531)" />
          </pattern>
          <filter
            id="well_bitrotate"
            x={526.842}
            y={450.792}
            width={67.157}
            height={73.41}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation={12.5} />
            <feColorMatrix values="0 0 0 0 0.283843 0 0 0 0 0.742183 0 0 0 0 1 0 0 0 0.94 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <pattern id="well_bitimg" patternContentUnits="objectBoundingBox" width={1} height={1}>
            <use xlinkHref="#prefix__image1" transform="matrix(.00126 0 0 .00186 -.71 -.531)" />
          </pattern>
          <linearGradient
            id="prefix__paint0_linear"
            x1={540}
            y1={364}
            x2={540}
            y2={595}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" stopOpacity={0.06} />
            <stop offset={1} stopColor="#fff" stopOpacity={0} />
          </linearGradient>
          <radialGradient
            id="prefix__paint1_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-666.48182 -95.97025 87.70892 -609.10956 702.404 492.626)"
          >
            <stop offset={0.006} stopColor="#BC319C" />
            <stop offset={0.306} stopColor="#8D0C75" />
            <stop offset={0.99} stopColor="#281B4A" />
          </radialGradient>
          <radialGradient
            id="prefix__paint2_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(-27.803 1284.894 -1062.33) scale(191.122 323.142)"
          >
            <stop stopColor="#D507A0" />
            <stop offset={0.486} stopColor="#4B1151" />
            <stop offset={1} stopColor="#362065" />
          </radialGradient>
          <radialGradient
            id="prefix__paint3_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(320.76893 -101.91166 130.56886 410.968 472.444 476.89)"
          >
            <stop stopColor="#B3B3B3" stopOpacity={0.58} />
            <stop offset={1} stopColor="#3C3C3C" />
          </radialGradient>
          <linearGradient
            id="prefix__paint4_linear"
            x1={157.774}
            y1={417.173}
            x2={464.958}
            y2={459.359}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.557} stopColor="#3E6BBC" />
            <stop offset={1} stopColor="#598FE9" />
          </linearGradient>
          <linearGradient
            id="prefix__paint5_linear"
            x1={671.532}
            y1={467.787}
            x2={753.418}
            y2={467.787}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.37} stopOpacity={0} />
            <stop offset={0.38} stopOpacity={0.25} />
            <stop offset={1} stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="prefix__paint6_linear"
            x1={671.532}
            y1={495.934}
            x2={753.418}
            y2={495.934}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.37} stopOpacity={0} />
            <stop offset={0.38} stopOpacity={0.25} />
            <stop offset={1} stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="prefix__paint7_linear"
            x1={-37.456}
            y1={551.555}
            x2={702.117}
            y2={536.604}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.358} stopColor="#3B4454" />
            <stop offset={0.98} stopColor="#4E596C" />
          </linearGradient>
          <linearGradient
            id="prefix__paint8_linear"
            x1={702.423}
            y1={513.818}
            x2={839.668}
            y2={505.547}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#293140" />
            <stop offset={1} stopColor="#475369" />
          </linearGradient>
          <linearGradient
            id="prefix__paint9_linear"
            x1={147.498}
            y1={402.688}
            x2={702.25}
            y2={394.279}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#343434" />
            <stop offset={0.04} stopColor="#4F5156" />
            <stop offset={0.076} stopColor="#202227" />
            <stop offset={0.079} stopColor="#5A5A5A" />
            <stop offset={0.358} stopColor="#686868" />
            <stop offset={0.453} stopColor="#868686" />
            <stop offset={0.765} stopColor="#888" />
          </linearGradient>
          <linearGradient
            id="prefix__paint10_linear"
            x1={444.092}
            y1={394.28}
            x2={622.374}
            y2={408.69}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#09215B" stopOpacity={0.16} />
            <stop offset={1} stopColor="#112F7A" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="prefix__paint11_linear"
            x1={251.274}
            y1={402.129}
            x2={41.203}
            y2={407.697}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5B5B5B" />
            <stop offset={0.857} stopColor="#3B3B3B" />
            <stop offset={1} stopColor="#515151" />
          </linearGradient>
          <linearGradient
            id="prefix__paint12_linear"
            x1={702.424}
            y1={399.977}
            x2={838.447}
            y2={384.677}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#555" />
            <stop offset={1} stopColor="#787878" />
          </linearGradient>
          <radialGradient
            id="prefix__paint13_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(109.002 198.753 464.231) scale(239.554 809.705)"
          >
            <stop stopColor="#677285" />
            <stop offset={0.99} stopColor="#3C424D" />
          </radialGradient>
          <radialGradient
            id="prefix__paint14_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(-.898 28863.504 -41036.77) scale(287.035 485.309)"
          >
            <stop offset={0.11} stopColor="#7B869A" />
            <stop offset={0.795} stopColor="#3D434D" />
          </radialGradient>
          <radialGradient
            id="prefix__paint15_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-9.4205 -47.23944 114.91625 -22.91665 657.369 421.291)"
          >
            <stop stopColor="#B3B3B3" />
            <stop offset={1} stopColor="#3C3C3C" />
          </radialGradient>
          <radialGradient
            id="prefix__paint16_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(-102.497 400.576 13.265) scale(31.9155 146.278)"
          >
            <stop stopColor="#fff" stopOpacity={0.33} />
            <stop offset={1} stopColor="#27282D" stopOpacity={0} />
          </radialGradient>
          <radialGradient
            id="prefix__paint17_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-4.89376 -44.87133 306.6427 -33.4431 253.632 412.528)"
          >
            <stop stopColor="#8A8D94" />
            <stop offset={1} stopColor="#27282D" stopOpacity={0} />
          </radialGradient>
          <radialGradient
            id="prefix__paint18_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(97.1155 -35.82626 309.9226 840.11808 49.312 390.587)"
          >
            <stop offset={0.075} stopOpacity={0.35} />
            <stop offset={0.768} stopOpacity={0} />
          </radialGradient>
          <linearGradient
            id="prefix__paint19_linear"
            x1={430.898}
            y1={357.967}
            x2={430.898}
            y2={421.291}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A3B2CC" />
            <stop offset={1} stopColor="#A3B2CC" />
          </linearGradient>
          <radialGradient
            id="prefix__paint20_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(124.383 401.631 317.013) scale(322.583 676.157)"
          >
            <stop offset={0.014} stopColor="#DFECFF" stopOpacity={0.4} />
            <stop offset={0.318} stopColor="#D5DEFF" stopOpacity={0.4} />
            <stop offset={0.468} stopColor="#C5D0ED" stopOpacity={0.27} />
            <stop offset={1} stopColor="#CED0FF" stopOpacity={0.35} />
          </radialGradient>
          <linearGradient
            id="prefix__paint21_linear"
            x1={180.437}
            y1={341.608}
            x2={166.132}
            y2={146.704}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.014} stopColor="#DFECFF" stopOpacity={0} />
            <stop offset={1} stopColor="#CED0FF" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient
            id="prefix__paint22_linear"
            x1={248.53}
            y1={330.529}
            x2={233.957}
            y2={135.666}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.014} stopColor="#DFECFF" stopOpacity={0} />
            <stop offset={1} stopColor="#CED0FF" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient
            id="prefix__paint23_linear"
            x1={741.493}
            y1={354.066}
            x2={684.188}
            y2={234.457}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.014} stopColor="#DFECFF" stopOpacity={0} />
            <stop offset={1} stopColor="#CED0FF" stopOpacity={0.35} />
          </linearGradient>
          <linearGradient
            id="prefix__paint24_linear"
            x1={123}
            y1={358}
            x2={97.5}
            y2={262}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B1C4E3" />
            <stop offset={1} stopColor="#B1C4E3" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="prefix__paint25_linear"
            x1={112}
            y1={361}
            x2={112}
            y2={322.5}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B1C4E3" />
            <stop offset={1} stopColor="#B1C4E3" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="prefix__paint26_linear"
            x1={96.996}
            y1={210.476}
            x2={91.813}
            y2={217.071}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#12479E" />
            <stop offset={0.985} stopColor="#12479E" />
          </linearGradient>
          <linearGradient
            id="prefix__paint27_linear"
            x1={90.654}
            y1={166.983}
            x2={90.654}
            y2={221.697}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E73E5" />
            <stop offset={1} stopColor="#0B3C8D" />
          </linearGradient>
          <linearGradient
            id="prefix__paint28_linear"
            x1={102.876}
            y1={166.983}
            x2={102.876}
            y2={221.697}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E73E5" />
            <stop offset={1} stopColor="#0B3C8D" />
          </linearGradient>
          <linearGradient
            id="prefix__paint29_linear"
            x1={95.599}
            y1={167.588}
            x2={95.599}
            y2={211.749}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E73E5" />
            <stop offset={1} stopColor="#11469E" />
          </linearGradient>
          <linearGradient
            id="prefix__paint30_linear"
            x1={88.248}
            y1={168.641}
            x2={88.248}
            y2={223.354}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E73E5" />
            <stop offset={1} stopColor="#0B3C8D" />
          </linearGradient>
          <linearGradient
            id="prefix__paint31_linear"
            x1={100.469}
            y1={168.641}
            x2={100.469}
            y2={223.354}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E73E5" />
            <stop offset={1} stopColor="#0B3C8D" />
          </linearGradient>
          <linearGradient
            id="prefix__paint32_linear"
            x1={93.193}
            y1={169.245}
            x2={93.193}
            y2={213.407}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2E73E5" />
            <stop offset={1} stopColor="#11469E" />
          </linearGradient>
          <linearGradient
            id="prefix__paint33_linear"
            x1={97.439}
            y1={161.784}
            x2={92.255}
            y2={168.38}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#244D94" />
            <stop offset={0.985} stopColor="#2E73E5" />
          </linearGradient>
          <linearGradient
            id="prefix__paint34_linear"
            x1={105.242}
            y1={211.656}
            x2={102.038}
            y2={213.303}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#13336A" />
            <stop offset={1} stopColor="#12479E" />
          </linearGradient>
          <image id="prefix__image0" width={300} height={200} xlinkHref={SVGData.imageFractured} />
          <image id="prefix__image1" width={1920} height={1080} xlinkHref={SVGData.imageBit} />
        </defs>

        {/** Well's horizont */}
        <path
          className={classNames(`${MAIN_CLASS_SVG}-horizont`)}
          d="M0 364h1080v231H0V364z"
          fill="url(#prefix__paint0_linear)"
        />

        {/** Well's Collector */}
        <g className={classNames(`${MAIN_CLASS_SVG}-collector`)}>
          <path
            d="M813 364v83L702 574 20.027 480.995 20 388l71-24h722z"
            fill="url(#prefix__paint1_radial)"
          />
          <path
            d="M813 447v-71s-24.54 7.634-29.094 15.113c-15.356 19.528-60.401 15.451-80.891 46.581 0 0-.198 0-.792.202L702 574l111-127z"
            fill="url(#prefix__paint2_radial)"
          />
          <g
            style={{
              mixBlendMode: 'overlay',
            }}
            filter="url(#prefix__filter0_ii)"
          >
            <path
              d="M91 364l611 40v170L20 481v-93l71-24z"
              fill="url(#prefix__pattern0)"
              fillOpacity={0.25}
            />
          </g>
        </g>

        {/** Well's voidType is FRACTURED */}
        {isFractured && (
          <g className={classNames(`${MAIN_CLASS_SVG}-voidTypeFractured`)}>
            <g filter="url(#prefix__filter1_ii)">
              <path
                d="M813 447v-83s-24.566 11.462-29.121 19.249C768.523 403.581 722.49 396.588 702 429v145l111-127z"
                fill="url(#prefix__pattern1)"
                fillOpacity={0.1}
              />
            </g>
          </g>
        )}

        {/** Well with GNK */}
        {gnk && (
          <g filter="url(#prefix__filter2_i)">
            <path
              d="M813 364v16l-111 79-682-55v-16l71-24h722z"
              fill="url(#prefix__paint3_radial)"
            />
            <path
              d="M813 364v16l-111 79-682-55v-16l71-24h722z"
              fill="url(#prefix__paint4_linear)"
            />
            <path
              d="M813 364v16l-111 79-682-55v-16l71-24h722z"
              fill="url(#prefix__paint5_linear)"
            />
          </g>
        )}

        {/** Well with VNK */}
        {vnk && (
          <g className={classNames(`${MAIN_CLASS_SVG}-vnk`)}>
            <path d="M813 430v17L702 574 20 481v-19l682 76 111-108z" fill="#083382" />
            <path
              d="M812.564 430.29L813 447 701.8 572.97 20 481v-19l681.8 76.536L812.564 430.29z"
              fill="url(#prefix__paint6_linear)"
            />
          </g>
        )}

        {/** Well's surface overlay */}
        <g className={classNames(`${MAIN_CLASS_SVG}-overlay`)}>
          <path
            d="M598.573 547.417c-47.927 3.767-75.623-19.182-117.194-19.584-41.571-.402-96.363-20.027-147.786-15.352-54.138 4.921-134.45-19.479-176.548-25.148C109.764 480.967 20 471 20 471v10l682 93v-14s-57.865-16.165-103.427-12.583z"
            fill="url(#prefix__paint7_linear)"
          />
          <path
            d="M813 447v-8c-19.736 24.393-23.438 31.601-42.138 48.358-17.167 15.76-26.919 41.797-40.732 42.922C716.318 531.406 702 560 702 560v14l111-127z"
            fill="url(#prefix__paint8_linear)"
          />
          <g filter="url(#prefix__filter3_d)">
            <path
              d="M624.504 398.52c-33.499 11.47-57.815 17.128-88.992 16.726-31.176-.402-40.451-23.762-84.848-13.066-40.12 9.664-73.995 8.453-105.567 2.783-35.459-6.368-117.052-12.043-154.345-9.433-2.98-8.869-22.712-25.129-48.446-8.41-3.89 4.365-3.683 8.07-2.232 10.833 15.14-10.833 47.007-8.109 50.678 9.638 37.34-1.672 131.653 5.052 154.345 11.083 22.692 6.031 69.063 9.639 108.527-.412 31.571-3.418 44.989 5.025 61.17 9.046 37.815 9.396 76.451-4.866 116.617-4.866C661.798 422.442 702 440 702 440v-36c-.196.065-44.295-16.847-77.496-5.48z"
              fill="url(#prefix__paint9_linear)"
            />
            <path
              d="M624.504 398.52c-33.499 11.47-57.815 17.128-88.992 16.726-31.176-.402-40.451-23.762-84.848-13.066-40.12 9.664-73.995 8.453-105.567 2.783-35.459-6.368-117.052-12.043-154.345-9.433-2.98-8.869-22.712-25.129-48.446-8.41-3.89 4.365-3.683 8.07-2.232 10.833 15.14-10.833 47.007-8.109 50.678 9.638 37.34-1.672 131.653 5.052 154.345 11.083 22.692 6.031 69.063 9.639 108.527-.412 31.571-3.418 44.989 5.025 61.17 9.046 37.815 9.396 76.451-4.866 116.617-4.866C661.798 422.442 702 440 702 440v-36c-.196.065-44.295-16.847-77.496-5.48z"
              fill="#A3B2CC"
            />
            <path
              d="M624.504 398.52c-33.499 11.47-57.815 17.128-88.992 16.726-31.176-.402-40.451-23.762-84.848-13.066-40.12 9.664-73.995 8.453-105.567 2.783-35.459-6.368-117.052-12.043-154.345-9.433-2.98-8.869-22.712-25.129-48.446-8.41-3.89 4.365-3.683 8.07-2.232 10.833 15.14-10.833 47.007-8.109 50.678 9.638 37.34-1.672 131.653 5.052 154.345 11.083 22.692 6.031 69.063 9.639 108.527-.412 31.571-3.418 44.989 5.025 61.17 9.046 37.815 9.396 76.451-4.866 116.617-4.866C661.798 422.442 702 440 702 440v-36c-.196.065-44.295-16.847-77.496-5.48z"
              fill="url(#prefix__paint10_linear)"
            />
          </g>
          <g filter="url(#prefix__filter4_d)">
            <path d="M20 388v10l124 10v-11l-124-9z" fill="url(#prefix__paint11_linear)" />
            <path d="M20 388v10l124 10v-11l-124-9z" fill="#A3B2CC" />
          </g>
          <g filter="url(#prefix__filter5_d)">
            <path
              d="M740.712 416.542C763.314 413.69 799.831 384.704 813 375v-11c-20.064 11.584-23.994 15.147-42.694 24.125-17.167 8.443-26.493 2.272-40.306 2.875-13.812.603-28 13-28 13v36c0 .201 21.983-21.347 38.712-23.458z"
              fill="url(#prefix__paint12_linear)"
            />
            <path
              d="M740.712 416.542C763.314 413.69 799.831 384.704 813 375v-11c-20.064 11.584-23.3 15.022-42 24-17.167 8.443-28.187 2.397-42 3-13.812.603-27 13-27 13v36c0 .201 21.983-21.347 38.712-23.458z"
              fill="#899BBB"
            />
          </g>
        </g>

        {/** Well with EXPLORATION */}
        {!isNil(objective) && objective === 'EXPLORATION' && (
          <g className={classNames(`${MAIN_CLASS_SVG}-objective-exploration`)}>
            <path
              d="M91 364h722v83L702 574 20 481l.026-46.359L20 388l71-24z"
              fill="url(#prefix__paint13_radial)"
            />
            <path
              d="M813 447v-83s-28.043 5.549-32.598 13.028C765.046 396.556 716.179 380.5 702 400v174l111-127z"
              fill="url(#prefix__paint14_radial)"
            />
          </g>
        )}

        {/** Well's surface */}
        <g className={classNames(`${MAIN_CLASS_SVG}-top`)}>
          <path
            d="M535.492 417.153c31.176.418 55.493-5.465 88.992-17.388 30.85-10.98 68.783 1.426 74.516 3.235.437.138 2.986 1.005 3 1 0 0 13.843-11.968 27.655-12.595 4.467-.203 8.501.36 12.495.917 8.356 1.164 16.538 2.305 28.153-3.634 15.112-7.542 17.03-6.7 28.609-15.64C801.661 370.925 813 364 813 364H91l-71 24 124 9c-6.906-4.14-3.719-8.831 3.3-11.223 24.665-8.408 42.183 7.772 43.306 11.125 29.862-2.173 124.36 3.226 154.471 8.847 31.571 5.894 65.446 7.868 105.567-2.18 26.765-6.702 40.765-.539 54.494 5.506 9.045 3.982 17.972 7.912 30.354 8.078z"
            fill="url(#prefix__paint15_radial)"
          />
          <path
            d="M535.492 417.153c31.176.418 55.493-5.465 88.992-17.388 30.85-10.98 68.783 1.426 74.516 3.235.437.138 2.986 1.005 3 1 0 0 13.843-11.968 27.655-12.595 4.467-.203 8.501.36 12.495.917 8.356 1.164 16.538 2.305 28.153-3.634 15.112-7.542 17.03-6.7 28.609-15.64C801.661 370.925 813 364 813 364H91l-71 24 124 9c-6.906-4.14-3.719-8.831 3.3-11.223 24.665-8.408 42.183 7.772 43.306 11.125 29.862-2.173 124.36 3.226 154.471 8.847 31.571 5.894 65.446 7.868 105.567-2.18 26.765-6.702 40.765-.539 54.494 5.506 9.045 3.982 17.972 7.912 30.354 8.078z"
            fill="url(#prefix__paint16_radial)"
          />
          <path
            d="M535.492 417.153c31.176.418 55.493-5.465 88.992-17.388 30.85-10.98 68.783 1.426 74.516 3.235.437.138 2.772.929 3 1 0 0 13.843-11.968 27.655-12.595 4.467-.203 8.501.36 12.495.917 8.356 1.164 16.538 2.305 28.153-3.634 15.112-7.542 17.03-6.7 28.609-15.64C801.661 370.925 813 364 813 364H91l-71 24 124 9c-6.906-4.14-3.719-8.831 3.3-11.223 24.665-8.408 42.183 7.772 43.306 11.125 29.862-2.173 124.36 3.226 154.471 8.847 31.571 5.894 65.446 7.868 105.567-2.18 26.765-6.702 40.765-.539 54.494 5.506 9.045 3.982 17.972 7.912 30.354 8.078z"
            fill="url(#prefix__paint17_radial)"
          />
          <path
            d="M535.764 417.153c31.176.418 55.493-5.465 88.992-17.388 30.85-10.98 68.511 1.426 74.244 3.235.437.138 2.986 1.005 3 1 0 0 14.115-11.968 27.927-12.595 4.467-.203 8.501.36 12.495.917 8.356 1.164 16.538 2.305 28.153-3.634 15.112-7.542 17.03-6.7 28.609-15.64C801.933 370.925 813 364 813 364H91l-71 24 124 9c-6.906-4.14-3.447-8.831 3.572-11.223 24.665-8.408 42.183 7.772 43.306 11.125 29.862-2.173 124.36 3.226 154.471 8.847 31.571 5.894 65.446 7.868 105.567-2.18 26.765-6.702 40.765-.539 54.494 5.506 9.045 3.982 17.972 7.912 30.354 8.078z"
            fill="url(#prefix__paint18_radial)"
            fillOpacity={0.7}
          />
          <path
            style={{
              mixBlendMode: 'overlay',
            }}
            d="M535.492 417.153c31.176.418 55.493-5.465 88.992-17.388 30.85-10.98 68.783 1.426 74.516 3.235.437.138 2.986 1.005 3 1 0 0 13.843-11.968 27.655-12.595 4.467-.203 8.501.36 12.495.917 8.356 1.164 16.538 2.305 28.153-3.634 15.112-7.542 17.03-6.7 28.609-15.64C801.661 370.925 813 364 813 364H91l-71 24 124 9c-6.906-4.14-3.719-8.831 3.3-11.223 24.665-8.408 42.183 7.772 43.306 11.125 29.862-2.173 124.36 3.226 154.471 8.847 31.571 5.894 65.446 7.868 105.567-2.18 26.765-6.702 40.765-.539 54.494 5.506 9.045 3.982 17.972 7.912 30.354 8.078z"
            fill="url(#prefix__paint19_linear)"
          />

          {/** Well's cover */}
          <path
            d="M702 248l111-40.998H91L20 218l682 30z"
            fill="url(#prefix__paint20_radial)"
            fillOpacity={0.58}
          />
          <path
            d="M702 248l-.104 140.929-681.894-18.403V218L702 248z"
            fill="url(#prefix__paint21_linear)"
            fillOpacity={0.37}
          />
          <path
            d="M813 207l-.162 157.22L20 364V218l71-11h722z"
            fill="url(#prefix__paint22_linear)"
            fillOpacity={0.17}
          />
          <path
            d="M812.936 223.463L702 266 20 235.54"
            stroke="#fff"
            strokeOpacity={0.07}
            strokeWidth={1.137}
          />
          <path
            d="M812.936 239.463L702 284 20 253.54"
            stroke="#fff"
            strokeOpacity={0.04}
            strokeWidth={1.137}
          />
          <path
            d="M812.936 256.463L702 303 20 272.54"
            stroke="#fff"
            strokeOpacity={0.02}
            strokeWidth={1.137}
          />
          <path
            d="M702 248l111-41-.062 124.885-111.042 75.123L702 248z"
            fill="url(#prefix__paint23_linear)"
            fillOpacity={0.37}
          />
        </g>

        {/** Well's with MGRP */}
        {mgrpRender && <path className={classNames(`${MAIN_CLASS_SVG}-mgrp`)} d={mgrpRender} />}

        {/* <WellsSections> */}
        <g className={classNames(`${MAIN_CLASS_SVG}-sections`)}>
          {/** <WellsAdditionalSections> */}
          {!fbCount &&
            additionalSections.length &&
            additionalSections.map((item, index) => {
              return (
                !isNil(additionalSectionsArray[index]) && (
                  <g
                    className={classNames(
                      `${MAIN_CLASS_SVG}-additional`,
                      `${MAIN_CLASS_SVG}-additional-${index}`,
                      {
                        [`${MAIN_CLASS_SVG}-section-current`]:
                          !isNil(item) && !isNil(item.hasTool) && item.hasTool,
                      }
                    )}
                    key={index + 2}
                  >
                    {/** Render section */}
                    <path
                      className={classNames(
                        `${MAIN_CLASS_SVG}-section`,
                        `${MAIN_CLASS_SVG}-section-${index + 1}`,
                        {
                          [`${MAIN_CLASS_SVG}-section-done`]:
                            !isNil(item.drillingEnd) && item.drillingEnd,
                        }
                      )}
                      d={additionalSectionsArray[index]}
                    />

                    {/** Render bit */}
                    {!isNil(item) && !isNil(item.hasTool) && item.hasTool && (
                      <g
                        dangerouslySetInnerHTML={{
                          __html: renderBit('additional', additionalSections.length, index),
                        }}
                      />
                    )}
                  </g>
                )
              )
            })}
          {/** </WellsAdditionalSections> */}

          {/* <Fishbones> */}
          {fishBonesRender &&
            additionalSections.map((item, index) => {
              return (
                <g
                  className={classNames(
                    `${MAIN_CLASS_SVG}-fishbones`,
                    `${MAIN_CLASS_SVG}-fishbones-${index}`,
                    {
                      [`${MAIN_CLASS_SVG}-section-current`]:
                        !isNil(item) && !isNil(item.hasTool) && item.hasTool,
                    }
                  )}
                  key={index + 200}
                >
                  {/** Render section */}
                  <path
                    className={classNames(`${MAIN_CLASS_SVG}-section`, {
                      [`${MAIN_CLASS_SVG}-section-done`]:
                        !isNil(item.drillingEnd) && item.drillingEnd,
                    })}
                    d={fishBones[index]}
                  />
                  {/** Render bit */}
                  {!isNil(item) && !isNil(item.hasTool) && item.hasTool && (
                    <g
                      dangerouslySetInnerHTML={{
                        __html: renderBit('fishbones', additionalSections.length, index),
                      }}
                    />
                  )}
                </g>
              )
            })}
          {/* </Fishbones> */}

          {/* <WellsPilot1> */}
          {((!isNil(PilotSections) && PilotSections.length > 0) ||
            (objective == 'ZBS' && motherboreSections.length)) && (
            <g className={classNames(`${MAIN_CLASS_SVG}-pilot-1`)}>
              {/** Render "M" label */}
              {objective !== 'ZBS' && (
                <g className={classNames(`${MAIN_CLASS_SVG}-pilotLabel`)}>
                  <rect x={93} y={448} width={17} height={17} rx={4} fill="#B1C4E3" />
                  <path
                    d="M104.786 461.944h-2.01v-8.278h-2.953v8.278h-2.01v-9.953h6.973v9.953z"
                    fill="#000"
                  />
                </g>
              )}

              {/** Render section */}
              <path
                d="M97 255.5c5 47 37 218 37 218"
                stroke="url(#prefix__paint24_linear)"
                strokeWidth={3.36}
                strokeLinecap="round"
              />

              {/** Render bit */}
              {!isNil(PilotSections[0]) &&
                !isNil(PilotSections[0].hasTool) &&
                PilotSections[0].hasTool && (
                  <g dangerouslySetInnerHTML={{ __html: renderBit('pilot', 0, 0) }} />
                )}
            </g>
          )}
          {/* </WellsPilot1> */}

          {/* <WellsPilot2> */}
          {!isNil(PilotSections) && PilotSections.length > 1 && (
            <g className={classNames(`${MAIN_CLASS_SVG}-pilot-2`)}>
              <path
                d="M111.5 317.5c10 35.5 47 159 47 159"
                stroke="url(#prefix__paint25_linear)"
                strokeWidth={3.36}
                strokeLinecap="round"
              />

              {/** Render bit transform="rotate(-13.09 137.236 437.935)" */}
              {!isNil(PilotSections[1]) &&
                !isNil(PilotSections[1].hasTool) &&
                PilotSections[1].hasTool && (
                  <g dangerouslySetInnerHTML={{ __html: renderBit('pilot', 0, 1) }} />
                )}
            </g>
          )}
          {/* </WellsPilot2> */}

          {/** <Main-sections> */}
          {motherboreSections.length &&
            typeof SectionArray[motherboreSections.length - 1] !== 'undefined' &&
            SectionArray[motherboreSections.length - 1].map((_, index) => {
              return (
                !isNil(SectionArray[motherboreSections.length - 1][index]) && (
                  <g
                    className={classNames(
                      `${MAIN_CLASS_SVG}-main`,
                      `${MAIN_CLASS_SVG}-main-${motherboreSections.length}-${index}`,
                      {
                        [`${MAIN_CLASS_SVG}-section-current`]:
                          !isNil(motherboreSections[index]) &&
                          !isNil(motherboreSections[index].hasTool) &&
                          motherboreSections[index].hasTool,
                      }
                    )}
                    key={index + 1000}
                  >
                    {/** Render section */}
                    <path
                      className={classNames(
                        `${MAIN_CLASS_SVG}-section`,
                        `${MAIN_CLASS_SVG}-section-${index + 1000}`,
                        {
                          [`${MAIN_CLASS_SVG}-section-done`]:
                            !isNil(motherboreSections[index].drillingEnd) &&
                            motherboreSections[index].drillingEnd,
                        }
                      )}
                      d={SectionArray[motherboreSections.length - 1][index]}
                    />

                    {/** Render bit */}
                    {!isNil(motherboreSections[index]) &&
                      !isNil(motherboreSections[index].hasTool) &&
                      motherboreSections[index].hasTool && (
                        <g
                          dangerouslySetInnerHTML={{
                            __html: renderBit('main', motherboreSections.length, index),
                          }}
                        />
                      )}
                  </g>
                )
              )
            })}
          {/** </Main-sections> */}
        </g>
        {/* </WellsSections> */}

        {/** Well's rig */}
        <g className={classNames(`${MAIN_CLASS_SVG}-rig`)}>
          <path
            fill="#13346D"
            d="M105.621 212.926h2.47v1.553h-2.47zM109.167 213.565c-.332.291-1.011.881-1.076.914v-1.546l1.076-.89v1.522z"
          />
          <path
            d="M84.905 211.701L81 215.055h24.677l3.89-3.354H84.905z"
            fill="url(#prefix__paint26_linear)"
          />
          <path
            fill="#13346D"
            d="M82.315 216.033h2.47v1.553h-2.47zM85.86 216.671c-.33.291-1.01.881-1.075.914v-1.546l1.076-.889v1.521zM101.968 216.033h2.47v1.553h-2.47zM105.515 216.671c-.332.291-1.011.881-1.077.914v-1.546l1.077-.889v1.521z"
          />
          <g opacity={0.6}>
            <path
              d="M94.358 163.667l-5.637 49.065"
              stroke="url(#prefix__paint27_linear)"
              strokeWidth={2}
            />
            <path
              d="M99.543 163.667l5.311 48.898"
              stroke="url(#prefix__paint28_linear)"
              strokeWidth={2}
            />
            <path d="M88.803 211.749h15.924" stroke="#10449B" strokeWidth={2} />
            <path
              d="M88.803 211.749l14.442-11.606-12.22-9.533 10.369-8.705-8.518-7.46 6.666-9.534"
              stroke="url(#prefix__paint29_linear)"
            />
            <path d="M91.395 190.609h11.11" stroke="#205CC1" />
            <path d="M92.136 181.491h9.628" stroke="#2565CF" />
            <path d="M92.876 174.03h7.777" stroke="#296BD9" />
            <path d="M89.914 199.729h13.702" stroke="#1851AF" />
          </g>
          <path
            d="M91.94 165.343l-5.607 48.883"
            stroke="url(#prefix__paint30_linear)"
            strokeWidth={2}
          />
          <path
            d="M97.11 165.108l5.332 49.127"
            stroke="url(#prefix__paint31_linear)"
            strokeWidth={2}
          />
          <path d="M86.396 213.407h15.924" stroke="#12479E" strokeWidth={2} />
          <path
            d="M86.396 213.407l14.443-11.606-11.99-9.539 10.138-8.699-8.517-7.461 6.666-9.533"
            stroke="url(#prefix__paint32_linear)"
          />
          <path d="M88.989 192.267h11.109" stroke="#205CC1" />
          <path d="M89.73 183.148h9.628" stroke="#2565CF" />
          <path d="M90.47 175.688h7.777" stroke="#296BD9" />
          <path d="M87.507 201.386h13.702" stroke="#1851AF" />
          <path
            d="M93.625 163.838l-2.424 1.696h6.642l2.409-1.696h-6.627z"
            fill="url(#prefix__paint33_linear)"
          />
          <path
            d="M102.702 213.392l2.54-1.736"
            stroke="url(#prefix__paint34_linear)"
            strokeWidth={2}
          />
          <path
            d="M81 215.055h24.671v1.001H81v-1.001zM105.671 216.043v-.979l3.891-3.359v.979l-3.891 3.359z"
            fill="#13346D"
          />
        </g>
      </svg>
    </div>
  )
}
