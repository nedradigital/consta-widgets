import React from 'react';

import { classname } from '@/utils/classname';

import { ProgressTimeChart, ProgressTimeChartProps } from './components/ProgressTimeChart';
import { ProgressTimeDate, ProgressTimeDateProps } from './components/ProgressTimeDate';
import { ProgressTimeText } from './components/ProgressTimeText';
import './index.css';

export const statuses = ['danger', 'normal', 'warning'] as const;

type Props = {
  className?: string;

  /** HSE по скважине [сутки] */
  hse?: number;

  /** Кол-во принятых рекомендаций */
  recAccepted?: number;

  /** Кол-во отклоненных рекомендаций */
  recRejected?: number;

  /** Отклонение сроков строительства [сутки] */
  timeGap?: number;

  statusTitle?: string;
  status?: typeof statuses[number];
} & ProgressTimeChartProps &
  ProgressTimeDateProps;

const cn = classname('progress-time-block');

export const ProgressTimeBlock: React.FC<Props> = ({
  className,
  currentDay,
  endDate,
  hse,
  planDaysCount,
  progress,
  recAccepted,
  recRejected,
  timeGap,
  statusTitle,
  status,
}) => (
  <div className={cn(null, null, className)}>
    <ProgressTimeDate currentDay={currentDay} endDate={endDate} planDaysCount={planDaysCount} />

    <ProgressTimeChart progress={progress} />

    <ProgressTimeText
      title={statusTitle}
      status={status}
      name="deviation"
      value={timeGap}
      unit="дн"
    />
    <ProgressTimeText title="Без проишествий" name="hse" value={hse} unit="дн" />
    <ProgressTimeText
      title="Рекомендации ЦУБ"
      name="recommendations"
      value={recAccepted}
      unit="принято"
    />
    <ProgressTimeText name="recommendations-refused" value={recRejected} unit="отклонено" />
  </div>
);
