/* tslint:disable */
/* eslint-disable */

import React from 'react'
import classNames from 'classnames'
import isNil from 'lodash/isNil'

import typedCSS from './index.css'

const css = (typedCSS as any) as { [index: string]: string }

const MAIN_CLASS = 'well-design'

export const OPERATIONS = Object.freeze({
  /** Бурение */
  DRILLING: 'DRILLING',
  /** Подъем КНБК */
  ASSEMBLY_LIFTING: 'ASSEMBLY_LIFTING',
  /** Спуск КНБК */
  ASSEMBLY_LOWERING: 'ASSEMBLY_LOWERING',
  /** Спуск хвостовика */
  TAILPIPE_LOWERING: 'TAILPIPE_LOWERING',
  /** Промывка на забое */
  BACKWASH: 'BACKWASH',
  /** Наращивание */
  CONNECTION_MAKING: 'CONNECTION_MAKING',
  /** Подъем с обратной проработкой */
  BACK_REAMING_LIFTING: 'BACK_REAMING_LIFTING',
  /** Сборка КНБК */
  ASSEMBLY_MAKEUP: 'ASSEMBLY_MAKEUP',
  /** Активация хвостовика */
  TAILPIPE_ACTIVATION: 'TAILPIPE_ACTIVATION',
  /** Цементирование */
  CEMENTING: 'CEMENTING',
  /** Разбуривание низа обсадной колонны */
  CASING_COLUMN_BOTTOM_DRILLING: 'CASING_COLUMN_BOTTOM_DRILLING',
  /** Замещение жидкости в скважине на БР */
  LIQUID_DISPLACEMENT: 'LIQUID_DISPLACEMENT',
  /** Разборка КНБК */
  ASSEMBLY_TWISTOFF: 'ASSEMBLY_TWISTOFF',
  /** Срезка */
  SIDETRACK: 'SIDETRACK',
  /** Зарезка */
  KICK_OFF: 'KICK_OFF',
  /** Спуск обсадной колонны */
  CASING_LOWERING: 'CASING_LOWERING',
  DEFAULT: 'DEFAULT',
})

export type OperationsType = keyof typeof OPERATIONS

type SectionType = {
  /** Время окончания цементирования */
  cementingEnd: number
  /** Диаметр секции */
  diameter: number
  /** Время окончания бурения */
  drillingEnd: number
  /** Признак завершения бурения секции */
  isActual: boolean
  /**
   * Фактическая глубина секции (если stageName != ПУ)
   * Глубина пилотного ствола (фактическое значение) (если stageName == ПУ)
   * */
  mdBottom: number
  /**
   * Плановая глубина секции
   * Плановая глубина фишбона (если stageName == ФБ)
   * */
  mdPlanBottom: number
  /** Плановая глубина срезки */
  mdPlanTop: number
  /** Глубина срезки */
  mdTop: number
  /** Имя секции */
  stageName: string
  /** Порядковый номер секции */
  stageNum: number
}

// @ts-ignore
type WellDesignPropsType = {
  /** Глубина долота */
  bitDepth: number
  /** Количество фишбонов */
  fbCount: number
  /** Кол-во МГРП (Кол-во стадий) */
  grpCount: number
  sections: Array<SectionType>
  operationType?: OperationsType
}

export class WellDesign extends React.Component<any> {
  depthConversionData: any
  positionGridData:
    | {
        step: number
        height: number
        segments: {
          position: number
          occupied: boolean
        }[]
      }
    | undefined
  viz: SVGSVGElement | null | undefined

  extractSectionTop(section: { isActual: boolean; mdTop: any; mdPlanTop: any }) {
    return section.isActual === true
      ? section.mdTop
      : !isNil(section.mdTop)
      ? section.mdTop
      : section.mdPlanTop
  }

  checkProgress(
    section: { isActual: boolean; stageNum: any; mdTop: any; mdBottom: any; mdPlanBottom: any },
    currentSectionNum: any
  ) {
    return (
      section.isActual !== true &&
      currentSectionNum === section.stageNum &&
      !isNil(section.mdTop) &&
      !isNil(section.mdBottom) &&
      !isNil(section.mdPlanBottom)
    )
  }

  calcSectionProgress(
    section: { stageNum: any; mdPlanBottom: number; mdTop: number; mdBottom: number },
    currentSectionNum: any
  ) {
    const def = [0, 1]

    if (currentSectionNum === section.stageNum) {
      const planHeight = section.mdPlanBottom - section.mdTop
      const height = section.mdBottom - section.mdTop
      const overdrilling = height / planHeight > 1
      const progress = overdrilling ? 1 : height / planHeight

      const proggressArr = [progress, progress]
      proggressArr[0] = proggressArr[0] > 0.5 ? proggressArr[0] - 0.2 : proggressArr[0]

      return proggressArr
    }

    return def
  }

  extractSectionBottom(section: {
    isActual: boolean
    mdBottom: number
    mdTop: number
    mdPlanBottom: any
  }) {
    //if section is finished
    return section.isActual === true
      ? //Check for incorrect physical bottom [top: 100, bottom: 90]
        section.mdBottom < section.mdTop
        ? section.mdPlanBottom
        : //Check for incorrect physical bottom [bottom: null]
        !isNil(section.mdBottom)
        ? section.mdBottom
        : section.mdPlanBottom
      : section.mdPlanBottom
  }

  initDepthConversionData(
    sections: any[],
    maxDepth: number,
    maxHeight: number,
    minSegmentHeight: number
  ) {
    this.depthConversionData = {
      maxDepth: maxDepth,
      maxHeight: maxHeight,
      segments: sections
        .map((section: any, sectionIndex: number) => {
          const from =
              sectionIndex > 0 ? this.extractSectionBottom(sections[sectionIndex - 1]) || 0 : 0,
            to = this.extractSectionBottom(section) || 0
          return {
            from: from,
            to: to,
            ratio: 1,
          }
        })
        .sort((segmentA: { from: number }, segmentB: { from: number }) => {
          return segmentA.from > segmentB.from ? 1 : segmentA.from < segmentB.from ? -1 : 0
        })
        .reduce((segments, segment, _index, previousSegments) => {
          const segmentHeight = ((segment.to - segment.from) / maxDepth) * maxHeight
          if (segmentHeight < minSegmentHeight) {
            // @ts-ignore
            segment.height = minSegmentHeight
          } else {
            const shortSegments =
              previousSegments.filter((segment: { ratio: number; to: number; from: number }) => {
                return (
                  segment.ratio !== 0 &&
                  ((segment.to - segment.from) / maxDepth) * maxHeight < minSegmentHeight
                )
              }) || []

            const shortSegmentsLength = shortSegments.reduce(
              (length: number, segment: { to: number; from: number }) => {
                return length + (segment.to - segment.from)
              },
              0
            )

            const shortSegmentsHeight = shortSegments.length * minSegmentHeight

            // @ts-ignore
            segment.height =
              ((segment.to - segment.from) / (maxDepth - shortSegmentsLength)) *
              (maxHeight - shortSegmentsHeight)
          }
          // @ts-ignore
          segments.push(segment)
          return segments
        }, [])
        .map(
          (
            segment: { offset: number; ratio: number; height: number; to: number; from: number },
            index: number,
            segments: { height: React.ReactText }[]
          ) => {
            if (index === 0) {
              segment.offset = 0
            } else {
              // @ts-ignore
              segment.offset = segments[index - 1].offset + segments[index - 1].height
            }
            segment.ratio = segment.height / (segment.to - segment.from || 1)
            return segment
          }
        ),
    }
  }

  convertDepthToPosition(targetDepth: number) {
    // @ts-ignore
    const depth = Math.max(0, Math.min(this.depthConversionData.maxDepth, targetDepth))
    const segment =
      // @ts-ignore
      depth !== this.depthConversionData.maxDepth
        ? // @ts-ignore
          this.depthConversionData.segments.find(
            (segment: { from: number; to: number }) => depth >= segment.from && depth < segment.to
          )
        : // @ts-ignore
          this.depthConversionData.segments[this.depthConversionData.segments.length - 1]
    if (!segment) {
      console.log("Warning: couldn't locate precalculated depth segment for: ", targetDepth)
      return 0
    }
    return (depth - segment.from) * segment.ratio + segment.offset
  }

  initPositionGrid(height: number, step: number) {
    this.positionGridData = {
      step: step,
      height: height,
      segments: new Array(Math.ceil(height / step)).fill(0).map((_nothing, index) => {
        return {
          position: step * index,
          occupied: false,
        }
      }),
    }
  }

  getAdjustedPositionFromGrid(position: number, occupy = false) {
    // @ts-ignore
    const segmentIndex = this.positionGridData.segments.findIndex(
      (segment: { position: number; occupied: boolean }, _index: any) =>
        segment.position >= position && (!occupy || segment.occupied === false)
    )
    if (segmentIndex === -1) {
      return position
    }
    if (occupy) {
      // @ts-ignore
      this.positionGridData.segments[segmentIndex].occupied = true
    }
    // @ts-ignore
    return this.positionGridData.segments[segmentIndex].position
  }

  render() {
    if (!this.props.sections) {
      return null
    }

    const { bitDepth, sections, grpCount, currentSectionNum, operationType } = this.props

    const width = 165,
      height = 750,
      minSectionHeight = 28

    const tailSections = sections
      .filter((section: { stageKind: string }) => section.stageKind === 'SH')
      .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) => {
        return sectionA.stageNum > sectionB.stageNum
          ? 1
          : sectionA.stageNum < sectionB.stageNum
          ? -1
          : 0
      })

    const leftInsetSections = sections
      .filter((section: { stageKind: string }) => section.stageKind === 'PU')
      .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) =>
        sectionA.stageNum > sectionB.stageNum ? 1 : sectionA.stageNum < sectionB.stageNum ? -1 : 0
      )

    const rightInsetSections = sections
      .filter(
        (section: { stageKind: string; stageNum: any }, _index: any) =>
          section.stageKind === 'FB' ||
          section.stageKind === 'OS' ||
          (section.stageKind === 'SH' &&
            tailSections.length &&
            section.stageNum !== tailSections[0].stageNum)
      )
      .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) =>
        sectionA.stageNum > sectionB.stageNum ? 1 : sectionA.stageNum < sectionB.stageNum ? -1 : 0
      )
    // .reverse();

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
        (section: { stageKind: string; stageNum: any }, _index: any) =>
          section.stageKind !== 'SH' ||
          (!tailSections.length || section.stageNum === tailSections[0].stageNum)
      )
      .sort((sectionA: { stageNum: number }, sectionB: { stageNum: number }) => {
        return sectionA.stageNum > sectionB.stageNum
          ? 1
          : sectionA.stageNum < sectionB.stageNum
          ? -1
          : 0
      })
      .map((section: any, index: number) => {
        const newSection = section
        newSection.leftInsetsCount = leftInsetSections.reduce(
          (count: any, _insetSection: any, _insetIndex: any, _insetSections: any) => {
            return index === 0 ? count : count
          },
          0
        )
        newSection.rightInsetsCount = rightInsetSections.reduce(
          (count: any, _insetSection: any, _insetIndex: any, _insetSections: any) => {
            return index === 0 ? count : count
          },
          0
        )
        return newSection
      })

    const stickColumnToLeft = leftInsetSections.length === 0

    const maxDepth = Math.max(
      ...motherboreSections.map((section: any) => this.extractSectionBottom(section))
    )

    this.initDepthConversionData(motherboreSections, maxDepth, height, minSectionHeight)

    this.initPositionGrid(height, minSectionHeight)

    const bitPosition = !isNil(bitDepth) ? this.convertDepthToPosition(bitDepth) : null
    const bitType =
      operationType && operationType.toUpperCase() === 'CASING_LOWERING' ? 'boot' : 'bore'

    return (
      <div
        className={MAIN_CLASS}
        style={{
          marginTop: '0px',
          height: height + 'px',
          transform: stickColumnToLeft
            ? 'translate(-' + (width / 2 - 35 / 2) + 'px,0)'
            : 'translate(-35px, 0)',
        }}
      >
        {
          <svg
            className={css[`${MAIN_CLASS}__cap`]}
            ref={viz => (this.viz = viz)}
            width={width}
            height="10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M82.5 8L85.5 4L79.5 4L82.5 8Z" />
            <rect x="82.5" y="0" width="35" height="4" rx="2" transform="translate(-17.5, 0)" />
          </svg>
        }

        {motherboreSections.map(
          (
            section: {
              stageKind: string
              stageNum: any
              isActual: boolean
              drillingEnd: any
              mdTop: any
              diameter: React.ReactNode
              mdBottom: number
              mdPlanBottom: React.ReactNode
            },
            sectionIndex: string | number | undefined
          ) => {
            const sectionTopPosition = this.getAdjustedPositionFromGrid(
                // @ts-ignore
                sectionIndex > 0
                  ? this.convertDepthToPosition(
                      // @ts-ignore
                      this.extractSectionBottom(motherboreSections[sectionIndex - 1])
                    )
                  : 0
              ),
              sectionBottomPosition = this.getAdjustedPositionFromGrid(
                this.convertDepthToPosition(this.extractSectionBottom(section)),
                true
              ),
              sectionHeight = Math.max(minSectionHeight, sectionBottomPosition - sectionTopPosition)

            const finsCount = section.stageKind === 'SH' ? Math.min(grpCount, 6) : 0

            const sectionBitPosition =
              !isNil(bitDepth) && currentSectionNum === section.stageNum
                ? Math.max(
                    0,
                    Math.min(
                      sectionHeight - 5,
                      this.convertDepthToPosition(bitDepth) - sectionTopPosition
                    )
                  ) + 'px'
                : null

            const showProgress = this.checkProgress(section, currentSectionNum)
            // @ts-ignore
            const progressValue = this.calcSectionProgress(section, currentSectionNum)

            return (
              <div
                className={classNames(
                  css[`${MAIN_CLASS}__section`],
                  css[`${MAIN_CLASS}__section--stageKind${section.stageKind}`],
                  {
                    [css[`${MAIN_CLASS}__section--blue`]]: section.isActual === true,
                    [css[`${MAIN_CLASS}__section--white`]]:
                      section.isActual !== true && !isNil(section.drillingEnd),
                    [css[`${MAIN_CLASS}__section--black`]]:
                      section.isActual !== true && isNil(section.mdTop),
                    [css[`${MAIN_CLASS}__section--current`]]:
                      currentSectionNum === section.stageNum,
                    [css[`${MAIN_CLASS}__section--showprogress`]]: showProgress,
                  }
                )}
                style={{
                  top: sectionTopPosition + 'px',
                  height: sectionHeight + 'px',
                }}
                key={sectionIndex}
              >
                <div className={css[`${MAIN_CLASS}__section-info`]}>
                  <span className={css[`${MAIN_CLASS}__section-diameter`]}>
                    {!isNil(section.diameter) ? section.diameter : '--'}
                  </span>
                  <span className={css[`${MAIN_CLASS}__section-depth`]}>
                    <span className={css[`${MAIN_CLASS}__section-depth-actual`]}>
                      {!isNil(section.mdBottom) ? Math.round(section.mdBottom) : '--'}
                    </span>
                    <span className={css[`${MAIN_CLASS}__section-depth-planned`]}>
                      {!isNil(section.mdPlanBottom) ? section.mdPlanBottom : '--'}
                    </span>
                  </span>
                </div>
                <svg
                  className={css[`${MAIN_CLASS}__section-line`]}
                  ref={viz => (this.viz = viz)}
                  width={width}
                  height={sectionHeight}
                  fill="none"
                  style={{ bottom: 0 }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {showProgress && (
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          className={css[`${MAIN_CLASS}__section--showprogress-gradient-from`]}
                          offset={progressValue[0]}
                        />
                        <stop
                          className={css[`${MAIN_CLASS}__section--showprogress-gradient-to`]}
                          offset={progressValue[1]}
                        />
                      </linearGradient>
                    </defs>
                  )}
                  <path d={`M82.5 6v${sectionHeight - 8}`} className="default-well-line" />
                  {section.isActual === true && (
                    <path
                      d={`M88.5 ${sectionHeight}L78.1 ${sectionHeight}L76.5 ${sectionHeight}L82.5 ${sectionHeight -
                        7}L88.5 ${sectionHeight}Z`}
                      className="default-well-line-terminator"
                    />
                  )}
                </svg>
                {new Array(finsCount).fill(0).map((_nothing, finIndex) => {
                  return (
                    <svg
                      className={css[`${MAIN_CLASS}__section-fin`]}
                      ref={viz => (this.viz = viz)}
                      width="27"
                      height="18"
                      fill="none"
                      style={{ bottom: finIndex * 15 + 'px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      key={'section-fin-' + finIndex}
                    >
                      <defs>
                        <linearGradient
                          id={css[`${MAIN_CLASS}__section-fin-gradient`]}
                          x1="27"
                          y1="15"
                          x2="4.5"
                          y2="15"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop className={css[`${MAIN_CLASS}__section-fin-gradient-from`]} />
                          <stop
                            className={css[`${MAIN_CLASS}__section-fin-gradient-to`]}
                            offset="1"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M27 6.5V12.5V18L24.5 10.5L19.5 11L15.5 9L12.5 9.5L15.5 7.92857L19.5 8.5L24.5 6.5L27 0V6.5Z"
                        fill={`url(#${MAIN_CLASS}__section-fin-gradient)`}
                      />
                    </svg>
                  )
                })}
                {sectionBitPosition && (
                  <div
                    className={classNames(css[`${MAIN_CLASS}__bit`], {
                      [css[`${MAIN_CLASS}__bit--bore`]]: bitType === 'bore',
                      [css[`${MAIN_CLASS}__bit--boot`]]: bitType === 'boot',
                    })}
                    style={{ top: sectionBitPosition }}
                  />
                )}
              </div>
            )
          }
        )}

        {leftInsetSections.map(
          (
            insetSection: {
              stageNum: any
              isActual: boolean
              mdTop: any
              diameter: React.ReactNode
              mdBottom: any
              mdPlanBottom: any
            },
            insetIndex: React.ReactText
          ) => {
            const insetCurveHeight = 30,
              // @ts-ignore
              insetTop = this.extractSectionTop(insetSection),
              insetBottom = this.extractSectionBottom(insetSection),
              insetTopPosition = this.convertDepthToPosition(insetTop),
              insetHeight = Math.max(
                0,
                Math.min(
                  height - insetTopPosition,
                  Math.max(insetCurveHeight, this.convertDepthToPosition(insetBottom)) -
                    insetTopPosition
                )
              )

            const insetBitPosition =
              !isNil(bitDepth) && currentSectionNum === insetSection.stageNum
                ? Math.max(
                    insetTopPosition + insetCurveHeight,
                    Math.min(insetTopPosition + insetHeight, this.convertDepthToPosition(bitDepth))
                  ) -
                  insetTopPosition +
                  'px'
                : null

            const showProgress = this.checkProgress(insetSection, currentSectionNum)
            const progressValue = this.calcSectionProgress(insetSection, currentSectionNum)

            return (
              <div
                className={classNames(css[`${MAIN_CLASS}__section-inset`], {
                  [css[`${MAIN_CLASS}__section-inset--blue`]]: insetSection.isActual === true,
                  [css[`${MAIN_CLASS}__section-inset--white`]]:
                    insetSection.isActual !== true && !isNil(insetSection.mdTop),
                  [css[`${MAIN_CLASS}__section-inset--black`]]:
                    insetSection.isActual !== true && isNil(insetSection.mdTop),
                  [css[`${MAIN_CLASS}__section--current`]]:
                    currentSectionNum === insetSection.stageNum,
                  [css[`${MAIN_CLASS}__section--showprogress`]]: showProgress,
                })}
                style={{ top: insetTopPosition + 'px' }}
                key={'section-left-inset-' + insetIndex}
              >
                <svg
                  className={classNames([
                    css[`${MAIN_CLASS}__section-inset-symbol`],
                    css[`${MAIN_CLASS}__section-inset-symbol-reversed`],
                  ])}
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10.1924"
                    cy="10.5039"
                    r="6.5"
                    transform="rotate(45 10.1924 10.5039)"
                    fill="#050E1C"
                    stroke="white"
                  />
                  <path
                    d="M10.1924 4.13965V10.5036M10.1924 16.8676V10.5036M10.1924 10.5036L16.5563 10.5036"
                    stroke="white"
                  />
                </svg>
                <div
                  className={classNames(
                    css[`${MAIN_CLASS}__section-inset-left`],
                    css[`${MAIN_CLASS}__section-inset-left-${insetIndex}`]
                  )}
                >
                  <div
                    className={css[`${MAIN_CLASS}__section-inset-left-info`]}
                    style={{ top: insetHeight + 'px' }}
                  >
                    <div className={css[`${MAIN_CLASS}__section-inset-left-info-diameter`]}>
                      {!isNil(insetSection.diameter) ? insetSection.diameter : '--'}
                    </div>
                    <div className={css[`${MAIN_CLASS}__section-inset-left-info-depth`]}>
                      <div className={css[`${MAIN_CLASS}__section-inset-left-info-depth-actual`]}>
                        {insetSection.mdBottom || '--'}
                      </div>
                      <div className={css[`${MAIN_CLASS}__section-inset-left-info-depth-planned`]}>
                        {insetSection.mdPlanBottom || '--'}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={css[`${MAIN_CLASS}__section-inset-left-line`]}
                    xmlns="http://www.w3.org/2000/svg"
                    height={insetHeight}
                  >
                    {showProgress && (
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop
                            className={css[`${MAIN_CLASS}__section--showprogress-gradient-from`]}
                            offset={progressValue[0]}
                          />
                          <stop
                            className={css[`${MAIN_CLASS}__section--showprogress-gradient-to`]}
                            offset={progressValue[1]}
                          />
                        </linearGradient>
                      </defs>
                    )}
                    {insetIndex === 0 && (
                      <path
                        d={
                          'M4.1,' +
                          (insetHeight - 2) +
                          'v-' +
                          (insetHeight - insetCurveHeight - 2) +
                          'c0-8.3,6.7-15,15-15l0,0c5.5,0,10-4.5,10-10V2.3'
                        }
                        className="default-well-line"
                      />
                    )}
                    {insetIndex === 1 && (
                      <path
                        d={
                          'M1.99974,' +
                          (insetHeight - 2) +
                          'V39.8115C1.99974 26.0044 13.1926 14.8115 26.9997 14.8115H39.5209H67.042C72.5648 14.8115 77.042 10.3344 77.042 4.81152V2.31152'
                        }
                        className="default-well-line"
                      />
                    )}
                  </svg>
                  {insetBitPosition && (
                    <div
                      className={classNames(
                        css[`${MAIN_CLASS}__bit`],
                        css[`${MAIN_CLASS}__section-inset-left-bit`],
                        {
                          [css[`${MAIN_CLASS}__bit--bore`]]: bitType === 'bore',
                          [css[`${MAIN_CLASS}__bit--boot`]]: bitType === 'boot',
                        }
                      )}
                      style={{ top: insetBitPosition }}
                    />
                  )}
                </div>
              </div>
            )
          }
        )}

        {rightInsetSections.map(
          (
            insetSection: {
              stageNum: any
              isActual: boolean
              mdTop: any
              stageKind: string
              diameter: React.ReactNode
              mdBottom: any
              mdPlanBottom: any
            },
            insetIndex: string
          ) => {
            const insetTopPosition = this.getAdjustedPositionFromGrid(
                // @ts-ignore
                this.convertDepthToPosition(this.extractSectionTop(insetSection)),
                true
              ),
              insetCurveHeight = 33,
              insetHeight = 50

            const insetBitPosition =
              !isNil(bitDepth) && currentSectionNum === insetSection.stageNum
                ? Math.max(
                    insetTopPosition + insetCurveHeight,
                    Math.min(insetTopPosition + insetHeight, this.convertDepthToPosition(bitDepth))
                  ) -
                  insetTopPosition +
                  'px'
                : null

            const showProgress = this.checkProgress(insetSection, currentSectionNum)
            const progressValue = this.calcSectionProgress(insetSection, currentSectionNum)

            return (
              <div
                className={classNames(css[`${MAIN_CLASS}__section-inset`], {
                  [css[`${MAIN_CLASS}__section-inset--blue`]]: insetSection.isActual === true,
                  [css[`${MAIN_CLASS}__section-inset--white`]]:
                    insetSection.isActual !== true && !isNil(insetSection.mdTop),
                  [css[`${MAIN_CLASS}__section-inset--black`]]:
                    insetSection.isActual !== true && isNil(insetSection.mdTop),
                  [css[`${MAIN_CLASS}__section--current`]]:
                    currentSectionNum === insetSection.stageNum,
                  [css[`${MAIN_CLASS}__section--showprogress`]]: showProgress,
                })}
                style={{ top: insetTopPosition + 'px' }}
                key={'section-right-inset-' + insetIndex}
              >
                {(insetSection.stageKind === 'OS' || insetSection.stageKind === 'SH') && (
                  <svg
                    className={css[`${MAIN_CLASS}__section-inset-symbol`]}
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="10.1924"
                      cy="10.5039"
                      r="6.5"
                      transform="rotate(45 10.1924 10.5039)"
                      fill="#050E1C"
                      stroke="white"
                    />
                    <path
                      d="M10.1924 4.13965V10.5036M10.1924 16.8676V10.5036M10.1924 10.5036L16.5563 10.5036"
                      stroke="white"
                    />
                  </svg>
                )}
                <div className={css[`${MAIN_CLASS}__section-inset-right`]}>
                  <div className={css[`${MAIN_CLASS}__section-inset-right-info`]}>
                    <span className={css[`${MAIN_CLASS}__section-inset-right-info-diameter`]}>
                      {!isNil(insetSection.diameter) ? insetSection.diameter : '--'}
                    </span>
                    <span className={css[`${MAIN_CLASS}__section-inset-right-info-depth`]}>
                      <span className={css[`${MAIN_CLASS}__section-inset-right-info-depth-actual`]}>
                        {insetSection.mdBottom || '--'}
                      </span>
                      <span
                        className={css[`${MAIN_CLASS}__section-inset-right-info-depth-planned`]}
                      >
                        {insetSection.mdPlanBottom || '--'}
                      </span>
                    </span>
                  </div>
                  <svg
                    className={css[`${MAIN_CLASS}__section-inset-right-line`]}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showProgress && (
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            className={css[`${MAIN_CLASS}__section--showprogress-gradient-from`]}
                            offset={progressValue[0]}
                          />
                          <stop
                            className={css[`${MAIN_CLASS}__section--showprogress-gradient-to`]}
                            offset={progressValue[1]}
                          />
                        </linearGradient>
                      </defs>
                    )}
                    <path
                      d="M91.0176 15.3115H12.6924C7.16954 15.3115 2.69238 10.8344 2.69238 5.31152V2.31152"
                      className="default-well-line"
                    />
                  </svg>
                  {insetBitPosition && (
                    <div
                      className={classNames(
                        css[`${MAIN_CLASS}__bit`],
                        css[`${MAIN_CLASS}__section-inset-right-bit`],
                        {
                          [css[`${MAIN_CLASS}__bit--bore`]]: bitType === 'bore',
                          [css[`${MAIN_CLASS}__bit--boot`]]: bitType === 'boot',
                        }
                      )}
                      style={{ left: insetBitPosition }}
                    />
                  )}
                </div>
              </div>
            )
          }
        )}

        {!isNil(bitDepth) && !currentSectionNum && (
          <div
            className={classNames(css[`${MAIN_CLASS}__bit`], {
              [css[`${MAIN_CLASS}__bit--bore`]]: bitType === 'bore',
              [css[`${MAIN_CLASS}__bit--boot`]]: bitType === 'boot',
            })}
            style={{ top: bitPosition }}
          />
        )}
      </div>
    )
  }
}
