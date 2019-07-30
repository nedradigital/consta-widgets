import React from 'react';

import { isNil } from 'lodash';

import { classname } from '@/utils/classname';

import './index.css';

const cn = classname('timeline');

type Time = string;
type Depth = number;

type Props = {
  className?: string;
  data?: Array<[Time?, Depth?]>;
  styles?: React.CSSProperties;
};

export const Timeline = ({ className, data = [], styles = {} }: Props) => (
  <div className={cn(null, null, className)} style={styles}>
    {data.map((item, index) => {
      const [time, depth] = item;
      const depthRounded = !isNil(depth) ? Math.round(depth) : null;

      return (
        <div key={index} className={cn('item')}>
          <div className={cn('time')}>{time || '--'}</div>
          <div className={cn('value')}>{depthRounded || '--'}</div>
        </div>
      );
    })}
  </div>
);
