import css from './index.css'

type Props = {
  name: React.ReactNode
  children: React.ReactNode
}

export const WidgetSettingsItem: React.FC<Props> = ({ name, children }) => {
  return (
    <>
      <div className={css.name}>{name}</div>
      <div className={css.value}>{children}</div>
    </>
  )
}
