import React from 'react'

import css from './index.css'

type Props = {
  className?: string
  company?: string
  name?: string
  phone?: string
}

export const ContractorInfo: React.FC<Props> = ({
  company = 'Название подрядчика: --',
  name = 'Супервайзер',
  phone = '--',
  className,
}) => (
  <div className={className}>
    <div className={css.company}>{company}</div>
    <div className={css.info}>
      {name}, <div>{phone}</div>
    </div>
  </div>
)
