import React, { createRef, useEffect, useState } from 'react';

import * as d3 from 'd3';
import { isNil } from 'lodash';

import { classname } from '../../utils/classname';

import './index.css';

export const statuses = ['danger', 'normal', 'warning'] as const;
export type Data = number[] | number;
export type Status = typeof statuses[number];

type SummaryData = {
  factData?: Data;
  planData?: Data;
};

type Props = {
  className?: string;
  status?: Status;
  id: string;
} & SummaryData;

type CircleData = {
  safeFactData: number[];
  maxDuration: number;
  minValue: number;
  maxValue: number;
};

type CircleProps = {
  height?: number;
} & CircleData;

type LinearGradientProps = {
  type: 'linear' | 'area';
  status?: Status;
  id: string;
};

type CastSafeData = SummaryData;

const cn = classname('kpi-chart');

const MIN_WIDTH = 234;
const MIN_HEIGHT = 95;

const CLASS_LINE_BACKGROUND = cn('line-background');
const CLASS_LINE_FOREGROUND = cn('line-foreground');
const CLASS_AREA_FOREGROUND = cn('area-foreground');

export const castData = (data?: Data, length = 2) => {
  return (Array.isArray(data)
    ? data.length > 1
      ? data
      : new Array(2).fill(data[0])
    : new Array(length).fill(data)
  ).filter(value => !isNil(value));
};

export const castSafeData = ({ planData, factData }: CastSafeData) => {
  const maxDuration = Math.max(
    planData && Array.isArray(planData) ? planData.length - 1 : 0,
    factData && Array.isArray(factData) ? factData.length - 1 : 0
  );

  const safePlanData = castData(planData, maxDuration);
  const safeFactData = castData(factData, maxDuration);

  const minValue = Math.min(...safePlanData, ...safeFactData);
  const maxValue = Math.max(...safePlanData, ...safeFactData);

  return { safePlanData, safeFactData, maxDuration, minValue, maxValue };
};

export const castCircleData = ({ safeFactData, maxDuration, minValue, maxValue }: CircleData) => {
  const circleLeft = Math.min(1, Math.max(0, (safeFactData.length - 1) / maxDuration));
  const circleBottom = Math.min(
    1,
    Math.max(0, (safeFactData[safeFactData.length - 1] - minValue) / (maxValue - minValue))
  );

  return { circleLeft, circleBottom };
};

const Circle: React.FunctionComponent<CircleProps> = ({
  height = MIN_HEIGHT,
  safeFactData,
  maxDuration,
  minValue,
  maxValue,
}) => {
  const { circleLeft, circleBottom } = castCircleData({
    safeFactData,
    maxDuration,
    minValue,
    maxValue,
  });

  const isVisible =
    !isNil(circleLeft) && !isNil(circleBottom) && !isNaN(circleLeft) && !isNaN(circleBottom);

  if (isVisible) {
    return (
      <div
        className={cn('circle')}
        style={{
          left: circleLeft * 100 + '%',
          bottom: circleBottom * height + 'px',
        }}
      />
    );
  }

  return null;
};

const LinearGradient: React.FunctionComponent<LinearGradientProps> = ({ type, status, id }) => {
  if (!status) {
    return null;
  }

  return (
    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" className={cn(`${type}-gradient`, { start: status })} />
      <stop offset="100%" className={cn(`${type}-gradient`, { end: status })} />
    </linearGradient>
  );
};

export const KPIChart: React.FunctionComponent<Props> = ({
  id,
  planData,
  factData,
  className,
  status = 'normal',
}) => {
  const areaGradientId = cn(`area-gradient-${id}`);
  const linearGradientId = cn(`linear-gradient-${id}`);
  const scaleHeightBackground = d3.scaleLinear();
  const scaleHeightForeground = d3.scaleLinear();
  const scaleWidthBackground = d3.scaleLinear();
  const scaleWidthForeground = d3.scaleLinear();
  const [width, changeWidth] = useState(MIN_WIDTH);
  const [height, changeHeight] = useState(MIN_HEIGHT);
  const ref = createRef<SVGSVGElement>();

  const { safePlanData, safeFactData, maxDuration, minValue, maxValue } = castSafeData({
    planData,
    factData,
  });

  useEffect(() => {
    if (ref.current) {
      changeWidth(ref.current.getBoundingClientRect().width);
      changeHeight(ref.current.getBoundingClientRect().height);
    }

    scaleHeightBackground.domain([minValue, maxValue]).range([height - 1, 1]);

    scaleWidthBackground.domain([0, maxDuration]).range([0, width]);

    scaleHeightForeground.domain([minValue, maxValue]).range([height - 1, 1]);

    scaleWidthForeground.domain([0, maxDuration]).range([0, width]);

    const lineBackground = d3
      .line<number>()
      .x((_, index) => scaleWidthBackground(index))
      .y(value => scaleHeightBackground(value));

    const areaForeground = d3
      .area<number>()
      .x((_, index) => scaleWidthForeground(index))
      .y0(_ => scaleHeightForeground(0))
      .y1(value => scaleHeightForeground(value));

    const lineForeground = d3
      .line<number>()
      .x((_, index) => scaleWidthForeground(index))
      .y(value => scaleHeightForeground(value));

    d3.select(ref.current)
      .select(`.${CLASS_LINE_BACKGROUND}`)
      .datum(safePlanData)
      .attr('d', lineBackground);

    d3.select(ref.current)
      .datum(safeFactData)
      .select(`.${CLASS_AREA_FOREGROUND}`)
      .attr('style', `fill: url(#${areaGradientId});`)
      .attr('d', areaForeground);

    d3.select(ref.current)
      .datum(safeFactData)
      .select(`.${CLASS_LINE_FOREGROUND}`)
      .attr('style', `stroke: url(#${linearGradientId});`)
      .attr('d', lineForeground);
  });

  return (
    <div className={cn(null, null, className)}>
      <svg className={cn('svg')} ref={ref} width={width} height={height}>
        <defs>
          <LinearGradient type="linear" status={status} id={linearGradientId} />
          <LinearGradient type="area" status={status} id={areaGradientId} />
        </defs>
        {safePlanData.length > 0 && <path className={CLASS_LINE_BACKGROUND} />}
        {safeFactData.length > 0 && <path className={CLASS_LINE_FOREGROUND} />}
        {safeFactData.length > 0 && <path className={CLASS_AREA_FOREGROUND} />}
      </svg>
      <Circle
        safeFactData={safeFactData}
        maxDuration={maxDuration}
        minValue={minValue}
        maxValue={maxValue}
        height={height}
      />
    </div>
  );
};
