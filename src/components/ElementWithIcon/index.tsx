import React from 'react';

import { classname } from '@/utils/classname';

import './index.css';

const cn = classname('text-with-icon');

export const colors = ['normal', 'danger', 'warning'] as const;
type Color = typeof colors[number];

export const orders = ['normal', 'reverse'] as const;
type Order = typeof orders[number];

type Props = {
  icon: React.ReactNode;
  color?: Color;
  order?: Order;
  children: React.ReactNode;
  className?: string;
};

export const ElementWithIcon: React.FC<Props> = ({
  children,
  icon,
  color,
  order = 'normal',
  className,
}) => {
  const items = [
    <span key="icon" className={cn('icon', { color })}>
      {icon}
    </span>,
    <span key="element" className={cn('element')}>
      {children}
    </span>,
  ];

  return (
    <div className={cn(null, null, className)}>{order === 'reverse' ? items.reverse() : items}</div>
  );
};
