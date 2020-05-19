import { isNotNil } from '@csssr/gpn-utils/lib/type-guards'

import { FormatValue } from '@/types'

export const getFormattedValue = (v: number | null, formatter: FormatValue = String) => {
  if (!isNotNil(v)) {
    return 'Нет данных'
  }

  return formatter(v)
}
