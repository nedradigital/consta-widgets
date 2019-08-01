import React from 'react';

import { classname } from '../../utils/classname';

import './index.css';

export const statuses = ['danger', 'normal', 'warning'] as const;
type Status = typeof statuses[number];

type Props = {
  className?: string;
  status?: Status;
  children?: React.ReactNode;
};

const cn = classname('badge');

export const Badge: React.FC<Props> = ({ className, status, children }) => (
  <span className={cn(null, { status }, className)}>{children}</span>
);
