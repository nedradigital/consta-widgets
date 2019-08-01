import { useEffect, useRef, useState } from 'react';

type Props = {
  startTime: number;
};

const formatTime = (n: number): string => String(n).padStart(2, '0');

export const Timer: React.FC<Props> = ({ startTime }) => {
  const getDuration = () => new Date().getTime() - startTime;
  const [duration, setDuration] = useState(getDuration());
  const timeoutRef = useRef<number>();
  const updateTime = () => setDuration(getDuration());

  useEffect(updateTime, [startTime]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(updateTime, 1000);

    return () => clearTimeout(timeoutRef.current);
  });

  return (
    <>
      {[
        Math.floor(duration / 1000 / 60 / 60), // hours
        Math.floor(duration / 1000 / 60) % 60, // minutes
        Math.floor(duration / 1000) % 60, // seconds
      ]
        .map(Math.abs)
        .map(formatTime)
        .join(':')}
    </>
  );
};
