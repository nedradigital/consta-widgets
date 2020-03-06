import css from './index.css'

type Props = {
  src: string
}

export const Image: React.FC<Props> = ({ src }) => {
  return <img className={css.main} src={src} />
}
