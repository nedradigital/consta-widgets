import React from 'react'

import { classname } from '@/utils/classname'

import './index.css'

type Props = {
  className?: string
  company?: string
  name?: string
  phone?: string
}

const cn = classname('contractor-info')

export const ContractorInfo: React.FC<Props> = ({
  company = 'Название подрядчика: --',
  name = 'Супервайзер',
  phone = '--',
  className,
}) => (
  <div className={cn(null, null, className)}>
    <div className={cn('company')}>{company}</div>
    <div className={cn('info')}>
      {name}, <div className={cn('phone')}>{phone}</div>
    </div>
  </div>
)
