import { ChoiceGroup } from '@gpn-design/uikit'
import { shallow } from 'enzyme'

import { TextParams } from '@/dashboard/widget-params'

import { EditMode } from '../'

describe('EditMode', () => {
  it('сбрасывает ненужные параметры при переключении с расширенного режима на обычный', () => {
    const onChangeParams = jest.fn()
    const wrapper = shallow(
      <EditMode
        params={{
          text: 'Мой заголовок',
          type: 'advanced',
          size: '6xl',
          align: 'left',
          fontStyle: 'italic',
          view: 'primary',
        }}
        onChangeParams={onChangeParams}
      />
    )

    const modeSwitcher = wrapper.find(ChoiceGroup)

    modeSwitcher.simulate('change', false)

    expect(onChangeParams).toBeCalledWith(
      // без objectContaining отсутствие ключа и undefined jest будет считать одним и тем же
      expect.objectContaining({
        type: 'text1',
        view: undefined,
        fontStyle: undefined,
        align: undefined,
        size: undefined,
        decoration: undefined,
        font: undefined,
        lineHeight: undefined,
        spacing: undefined,
        transform: undefined,
        weight: undefined,
      })
    )
  })

  it('не сбрасывает общие параметры при переключении режима с расширенного на обычный', () => {
    const onChangeParams = jest.fn()
    const wrapper = shallow(
      <EditMode
        params={
          {
            text: 'Мой заголовок',
            type: 'advanced',
            croppedLineCount: 2,
            croppedWithGradient: true,
            // Общих параметров всех виджетов нет в типе, но они всё равно лежат в том же объекте
            growRatio: 1,
          } as TextParams
        }
        onChangeParams={onChangeParams}
      />
    )

    const modeSwitcher = wrapper.find(ChoiceGroup)

    modeSwitcher.simulate('change', false)

    expect(onChangeParams).toBeCalledWith(
      expect.not.objectContaining({
        croppedLineCount: undefined,
        croppedWithGradient: undefined,
        growRatio: undefined,
      })
    )
  })
})
