import React from 'react';

import { classname } from '@/utils/classname';

import directionImage from './images/i-direction.gif';
import './index.css';

const cn = classname('direction-indicator');

export const directions = ['down', 'up'] as const;

type DirectionIndicatorPropsType = {
  className?: string;
  direction: typeof directions[number];
};

export const DirectionIndicator = ({ className, direction }: DirectionIndicatorPropsType) => (
  <img className={cn(null, { direction }, className)} src={directionImage} alt={direction} />
);
