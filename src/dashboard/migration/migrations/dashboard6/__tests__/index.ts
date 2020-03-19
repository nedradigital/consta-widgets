import { Dashboard6, LinearChartWidgetId, migration6 } from '../'
import { Dashboard5 } from '../../dashboard5'

describe('migration6', () => {
  it('повышает версию', () => {
    const source: Dashboard5.State = {
      version: 5,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: LinearChartWidgetId,
            params: {
              isVertical: true,
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
              [
                {
                  type: 'widget',
                  debugName: '3',
                  id: '3',
                  widgetType: LinearChartWidgetId,
                  params: {
                    isVertical: false,
                  },
                },
              ],
            ],
            params: {
              growRatio: 1,
            },
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard6.State = {
      version: 6,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: LinearChartWidgetId,
            params: {
              isHorizontal: false,
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
              [
                {
                  type: 'widget',
                  debugName: '3',
                  id: '3',
                  widgetType: LinearChartWidgetId,
                  params: {
                    isHorizontal: true,
                  },
                },
              ],
            ],
            params: {
              growRatio: 1,
            },
          },
        ],
      },
      settings: {},
    }

    expect(migration6.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: Dashboard6.State = {
      version: 6,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: LinearChartWidgetId,
            params: {
              isHorizontal: true,
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
              [
                {
                  type: 'widget',
                  debugName: '3',
                  id: '3',
                  widgetType: LinearChartWidgetId,
                  params: {
                    isHorizontal: false,
                  },
                },
              ],
            ],
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard5.State = {
      version: 5,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: LinearChartWidgetId,
            params: {
              isVertical: false,
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
              [
                {
                  type: 'widget',
                  debugName: '3',
                  id: '3',
                  widgetType: LinearChartWidgetId,
                  params: {
                    isVertical: true,
                  },
                },
              ],
            ],
            params: {
              growRatio: 1,
            },
          },
        ],
      },
      settings: {},
    }

    expect(migration6.down(source)).toEqual(result)
  })
})
