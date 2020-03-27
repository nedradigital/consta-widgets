import { BarChartWidget } from '@/widgets/BarChartWidget'

import { getWidget } from '../widgets-list'

describe('getWidget', () => {
  it('возвращает компонент виджета барчарта', () => {
    expect(getWidget(BarChartWidget.id)).toEqual(BarChartWidget)
  })
})
