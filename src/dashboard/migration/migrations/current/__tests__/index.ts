import { TextWidget } from '@/widgets/TextWidget'

import { CurrentDashboard, currentMigration } from '../'
import { Dashboard7 } from '../../dashboard7'

describe('migration8', () => {
  it('повышает версию', () => {
    const source: Dashboard7.State = {
      version: 7,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: TextWidget.id,
            params: {
              croppedLineCount: 1,
            },
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {},
          },
        ],
        Box2: [
          {
            type: 'columns',
            columns: [
              {
                params: { growRatio: 2 },
                items: [
                  {
                    type: 'widget',
                    debugName: '3',
                    id: '3',
                    widgetType: TextWidget.id,
                    params: {},
                  },
                ],
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

    const result: CurrentDashboard.State = {
      version: 8,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: TextWidget.id,
            params: {
              croppedLineCount: 1,
              croppedWithGradient: true,
            },
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {},
          },
        ],
        Box2: [
          {
            type: 'columns',
            columns: [
              {
                params: { growRatio: 2 },
                items: [
                  {
                    type: 'widget',
                    debugName: '3',
                    id: '3',
                    widgetType: TextWidget.id,
                    params: {
                      croppedWithGradient: false,
                    },
                  },
                ],
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

    expect(currentMigration.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: CurrentDashboard.State = {
      version: 8,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: TextWidget.id,
            params: {
              croppedLineCount: 1,
              croppedWithGradient: true,
            },
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {},
          },
        ],
        Box2: [
          {
            type: 'columns',
            params: {
              growRatio: 1,
            },
            columns: [
              {
                params: {
                  growRatio: 2,
                },
                items: [
                  {
                    type: 'widget',
                    debugName: '3',
                    id: '3',
                    widgetType: TextWidget.id,
                    params: {
                      croppedWithGradient: false,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard7.State = {
      version: 7,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: TextWidget.id,
            params: {
              croppedLineCount: 1,
            },
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {},
          },
        ],
        Box2: [
          {
            type: 'columns',
            params: {
              growRatio: 1,
            },
            columns: [
              {
                params: {
                  growRatio: 2,
                },
                items: [
                  {
                    type: 'widget',
                    debugName: '3',
                    id: '3',
                    widgetType: TextWidget.id,
                    params: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      settings: {},
    }

    expect(currentMigration.down(source)).toEqual(result)
  })
})
