import classnames from 'classnames'

import css from './index.css'

type Props = {
  children: React.ReactNode
  titles: React.ReactNode
  subTitle?: React.ReactNode
  className?: string
}

export const Table: React.FC<Props> = ({ children, titles, subTitle, className }) => {
  return (
    <table className={classnames(css.main, className)}>
      <thead>
        <tr>{titles}</tr>
        {subTitle && <tr>{subTitle}</tr>}
      </thead>
      {children}
    </table>
  )
}
