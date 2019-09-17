import React, { useEffect, useState } from 'react'

import classnames from 'classnames'

import css from './index.css'

type Props = {
  className?: string
  title: React.ReactNode
  shortTitle: string
  isInitiallyOpened?: boolean
  items: readonly React.ReactNode[]
  children?: never
}

export const OpenableLabel: React.FC<Props> = ({
  isInitiallyOpened,
  title,
  shortTitle,
  items,
  className,
}) => {
  const [isOpened, setOpened] = useState(isInitiallyOpened)

  useEffect(() => {
    setOpened(isInitiallyOpened)
  }, [isInitiallyOpened])

  return (
    <div className={classnames(css.openableLabel, className)}>
      {isOpened ? (
        <>
          <div className={css.content}>
            <div className={css.title}>{title}</div>
            {items.map((item, idx) => (
              <div key={idx} className={css.item}>
                {item}
              </div>
            ))}
          </div>
          <span className={css.close} onClick={() => setOpened(false)} />
        </>
      ) : (
        <div className={css.shortTitleBlock} onClick={() => setOpened(true)}>
          <span className={css.shortTitle}>{shortTitle}</span>
          <span className={css.shortTitleIcon}>+</span>
        </div>
      )}
    </div>
  )
}
