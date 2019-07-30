import React from 'react';

import { classname } from '@/utils/classname';

import './index.css';

const cn = classname('background-status-indicator');

export const statuses = ['danger', 'important', 'warning'] as const;
type Status = typeof statuses[number];

type Props = {
  className?: string;
  status: Status;
  styles?: React.CSSProperties;
};

export const BackgroundStatusIndicator = ({ className, status, styles = {} }: Props) => (
  <div className={cn(null, { status }, className)} style={styles} />
);
