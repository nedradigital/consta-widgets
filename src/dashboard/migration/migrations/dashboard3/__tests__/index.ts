import { Dashboard3, migration3 } from '../'
import { Dashboard2 } from '../../dashboard2'

describe('migration3', () => {
  it('повышает версию', () => {
    const source: Dashboard2.State = {
      version: 2,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: '1',
            params: {},
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {
              height: 100,
            },
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
                  widgetType: '3',
                  params: {
                    marginTop: 's',
                    marginRight: 's',
                    height: 300,
                  },
                },
              ],
            ],
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard3.State = {
      version: 3,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: '1',
            params: {},
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {
              growRatio: 100,
            },
          },
        ],
        Box2: [
          {
            type: 'columns',
            params: {},
            columns: [
              [
                {
                  type: 'widget',
                  debugName: '3',
                  id: '3',
                  widgetType: '3',
                  params: {
                    marginTop: 's',
                    growRatio: 300,
                  },
                },
              ],
            ],
          },
        ],
      },
      settings: {},
    }

    expect(migration3.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: Dashboard3.State = {
      version: 3,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: '1',
            params: {},
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {
              growRatio: 100,
            },
          },
        ],
        Box2: [
          {
            type: 'columns',
            params: {},
            columns: [
              [
                {
                  type: 'widget',
                  debugName: '3',
                  id: '3',
                  widgetType: '3',
                  params: {
                    marginTop: 's',
                    growRatio: 300,
                  },
                },
              ],
            ],
          },
        ],
      },
      settings: {},
    }

    const result: Dashboard2.State = {
      version: 2,
      boxes: [],
      config: {
        Box0: [
          {
            type: 'widget',
            debugName: '1',
            id: '1',
            widgetType: '1',
            params: {},
          },
          {
            type: 'widget',
            debugName: '2',
            id: '2',
            widgetType: '2',
            params: {
              height: 100,
            },
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
                  widgetType: '3',
                  params: {
                    marginTop: 's',
                    height: 300,
                  },
                },
              ],
            ],
          },
        ],
      },
      settings: {},
    }

    expect(migration3.down(source)).toEqual(result)
  })
})
