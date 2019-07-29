import React from 'react';

import { classname } from '@/utils/classname';

import './index.css';

const cn = classname('switcher');

type SwitcherPropsType = {
  title?: React.ReactNode;
  isEnabled: boolean;
  onClick: (value: boolean) => void;
};

export const Switcher = ({ onClick, isEnabled, title }: SwitcherPropsType) => (
  <span
    className={cn(null, { 'is-enabled': isEnabled })}
    onClick={() => onClick && onClick(!isEnabled)}
  >
    {title && <span className={cn('title')}>{title}</span>}
    <span className={cn('switcher')}>
      <span className={cn('icon')} />
    </span>
  </span>
);
