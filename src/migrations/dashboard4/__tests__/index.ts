import { Dashboard4, migration4 } from '../'
import { Dashboard3 } from '../../dashboard3'

describe('migration4', () => {
  it('повышает версию', () => {
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
                  widgetType: '3',
                  params: {
                    marginTop: 's',
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

    const result: Dashboard4.State = {
      version: 4,
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
                  widgetType: '3',
                  params: {
                    marginTop: 's',
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

    expect(migration4.up(source)).toEqual(result)
  })

  it('понижает версию', () => {
    const source: Dashboard4.State = {
      version: 4,
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
              marginTop: '2xs',
            },
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
                  widgetType: '3',
                  params: {
                    marginTop: '2xs',
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
              marginTop: 'xs',
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
                    marginTop: 'xs',
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

    expect(migration4.down(source)).toEqual(result)
  })
})
