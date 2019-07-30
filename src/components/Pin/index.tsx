import React from 'react';

import { classname } from '@/utils/classname';

import './index.css';

const cn = classname('pin');

export const positions = ['left', 'right'] as const;
type Position = typeof positions[number];

export const statuses = ['danger', 'warning'] as const;
type Status = typeof statuses[number];

export const skins = ['inside', 'outside'] as const;
type Skin = typeof skins[number];

type Props = {
  className?: string;
  children: React.ReactNode;
  position?: Position;
  status?: Status;
  skin?: Skin;
  title?: string;
};

export const Pin: React.FunctionComponent<Props> = ({
  className,
  children,
  position = 'left',
  status,
  skin = 'inside',
  title,
}) => (
  <div className={cn(null, { position, skin, status }, className)}>
    <span className={cn('edge')} />
    <div className={cn('content')}>
      {title && <div className={cn('title')}>{title}</div>}
      <div className={cn('text')}>{children}</div>
    </div>
  </div>
);
