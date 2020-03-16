import css from './index.css'

type Props = {
  src: string
}

export const Image: React.FC<Props> = ({ src }) => {
  return <div style={{ backgroundImage: `url(${src})` }} className={css.main} />
}
