import { Dashboard7, migration7 } from '../'
import { Dashboard6 } from '../../dashboard6'

describe('migration7', () => {
  it('повышает версию', () => {
    const source: Dashboard6.State = {
      version: 6,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: 'lineChartId',
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
                  widgetType: 'lineChartId',
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

    const result: Dashboard7.State = {
      version: 7,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: 'lineChartId',
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
              {
                params: {},
                items: [
                  {
                    type: 'widget',
                    debugName: '3',
                    id: '3',
                    widgetType: 'lineChartId',
                    params: {
                      isHorizontal: true,
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

    expect(migration7.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: Dashboard7.State = {
      version: 7,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: 'lineChartId',
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
              {
                params: {},
                items: [
                  {
                    type: 'widget',
                    debugName: '3',
                    id: '3',
                    widgetType: 'lineChartId',
                    params: {
                      isHorizontal: false,
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

    const result: Dashboard6.State = {
      version: 6,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: 'lineChartId',
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
            columns: [
              [
                {
                  type: 'widget',
                  debugName: '3',
                  id: '3',
                  widgetType: 'lineChartId',
                  params: {
                    isHorizontal: false,
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

    expect(migration7.down(source)).toEqual(result)
  })
})
