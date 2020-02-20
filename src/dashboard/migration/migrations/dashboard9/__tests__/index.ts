import { widgetId as textWidgetId } from '@/widgets/TextWidget'

import { Dashboard9, migration9 } from '../'
import { Dashboard8 } from '../../dashboard8'

const createTextWidget = (name: string, params = {}) =>
  ({
    type: 'widget',
    debugName: name,
    id: name,
    widgetType: textWidgetId,
    params,
  } as const)

describe('migration9', () => {
  it('повышает версию', () => {
    const source: Dashboard8.State = {
      version: 8,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', {
            croppedLineCount: 1,
          }),
        ],
        Box2: [
          {
            type: 'columns',
            columns: [
              {
                params: { growRatio: 11 },
                items: [createTextWidget('col1-1'), createTextWidget('col1-2')],
              },
              {
                params: { growRatio: 22 },
                items: [createTextWidget('col2-1')],
              },
            ],
            params: {
              growRatio: 1,
            },
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard9.State = {
      version: 9,
      boxes: [],
      config: {
        Box0: [
          createTextWidget('1', {
            croppedLineCount: 1,
          }),
        ],
        Box2: [
          {
            type: 'grid',
            grid: {
              columnParams: [{ growRatio: 11 }, { growRatio: 22 }],
              rowParams: [{}],
              items: [
                // Строка 1
                [
                  // Колонка 1
                  [createTextWidget('col1-1'), createTextWidget('col1-2')],
                  // Колонка 2
                  [createTextWidget('col2-1')],
                ],
              ],
            },
            params: {
              growRatio: 1,
            },
          },
        ],
      },
      settings: {},
    }

    expect(migration9.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: Dashboard9.State = {
      version: 9,
      boxes: [],
      config: {
        Box0: [createTextWidget('1')],
        Box2: [
          {
            type: 'grid',
            grid: {
              columnParams: [{ growRatio: 11 }, { growRatio: 22 }],
              rowParams: [{}],
              items: [
                // Строка 1
                [
                  // Колонка 1
                  [createTextWidget('1.1a'), createTextWidget('1.1b')],
                  // Колонка 2
                  [createTextWidget('1.2')],
                ],
                // Строка 2
                [
                  // Колонка 1
                  [createTextWidget('2.1')],
                  // Колонка 2
                  [],
                ],
              ],
            },
            params: {
              growRatio: 1,
            },
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard8.State = {
      version: 8,
      boxes: [],
      config: {
        Box0: [createTextWidget('1')],
        Box2: [
          {
            type: 'columns',
            columns: [
              {
                params: {
                  growRatio: 11,
                },
                items: [createTextWidget('1.1a'), createTextWidget('1.1b')],
              },
              {
                params: {
                  growRatio: 22,
                },
                items: [createTextWidget('1.2')],
              },
            ],
            params: {
              growRatio: 1,
            },
          },
        ],
      },
      settings: {},
    }

    expect(migration9.down(source)).toEqual(result)
  })
})
