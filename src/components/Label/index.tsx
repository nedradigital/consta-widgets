import React from 'react';

import { classname } from '@/utils/classname';

import './index.css';

const cn = classname('label');

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Label = ({ className, children }: Props) => (
  <div className={cn(null, null, className)}>{children}</div>
);
