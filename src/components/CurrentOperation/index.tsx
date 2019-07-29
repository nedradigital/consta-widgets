import React from 'react';

import { classname } from '@/utils/classname';

import { ElementWithIcon } from '../ElementWithIcon';
import { Switcher } from '../Switcher';
import { Timer } from '../Timer';

import { ReactComponent as IconFb } from './images/i-fb.svg';
import { ReactComponent as IconTime } from './images/i-time.svg';
import './index.css';

type Props = {
  title: React.ReactNode;
  actualTime?: number;
  duration?: string;
  fb?: string;
  isAdaptive?: boolean;
  toggleAdaptive?: () => void;
};

const cn = classname('current-operation');

export const CurrentOperation = React.memo<Props>(
  ({ actualTime, duration, fb, title, isAdaptive, toggleAdaptive }) => (
    <div className={cn()}>
      <div className={cn('info-line')}>
        {actualTime && (
          <div className={cn('element')}>
            <ElementWithIcon icon={<IconTime />}>
              <Timer startTime={actualTime} />
            </ElementWithIcon>
          </div>
        )}

        {duration && (
          <div className={cn('element')}>
            <ElementWithIcon icon={<IconTime />}>{duration}</ElementWithIcon>
          </div>
        )}

        {fb && (
          <div className={cn('element')}>
            <ElementWithIcon icon={<IconFb />}>{fb}</ElementWithIcon>
          </div>
        )}

        {toggleAdaptive && (
          <div className={cn('switcher')}>
            <Switcher isEnabled={Boolean(isAdaptive)} onClick={toggleAdaptive} />
          </div>
        )}
      </div>

      <div className={cn('title')}>{title}</div>
    </div>
  )
);
