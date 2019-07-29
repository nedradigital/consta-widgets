import React, { useEffect, useState } from 'react';

import { classname } from '@/utils/classname';

import './index.css';

const cn = classname('openable-label');

type Props = {
  className?: string;
  title: React.ReactNode;
  shortTitle: string;
  isInitiallyOpened?: boolean;
  items: React.ReactNode[];
  children?: never;
};

export const OpenableLabel: React.FunctionComponent<Props> = ({
  isInitiallyOpened,
  title,
  shortTitle,
  items,
  className,
}) => {
  const [isOpened, setOpened] = useState(isInitiallyOpened);

  useEffect(() => {
    setOpened(isInitiallyOpened);
  }, [isInitiallyOpened]);

  return (
    <div className={cn(null, null, className)}>
      {isOpened ? (
        <>
          <div className={cn('content')}>
            <div className={cn('title')}>{title}</div>
            {items.map((item, idx) => (
              <div key={idx} className={cn('item')}>
                {item}
              </div>
            ))}
          </div>
          <span className={cn('close')} onClick={() => setOpened(false)} />
        </>
      ) : (
        <div className={cn('short-title-block')} onClick={() => setOpened(true)}>
          <span className={cn('short-title')}>{shortTitle}</span>
          <span className={cn('short-title-icon')}>+</span>
        </div>
      )}
    </div>
  );
};
