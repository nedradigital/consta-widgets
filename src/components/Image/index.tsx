import classNames from 'classnames'

import css from './index.css'

type Props = {
  src: string
  className?: string
}

export const Image: React.FC<Props> = ({ src, className }) => {
  return (
    <div style={{ backgroundImage: `url(${src})` }} className={classNames(css.main, className)} />
  )
}
