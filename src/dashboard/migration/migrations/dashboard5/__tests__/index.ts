import { Dashboard5, migration5 } from '../'
import { Dashboard4 } from '../../dashboard4'

describe('migration5', () => {
  it('upgrades', () => {
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
                  params: {},
                },
              ],
            ],
            params: {},
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
                  params: {},
                },
              ],
            ],
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(migration5.up(source)).toEqual(result)
  })

  it('downgrades', () => {
    const source: Dashboard5.State = {
      version: 5,
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
              fallbackPlaceholderText: 'Работы не ведутся',
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
                    fallbackPlaceholderText: 'Работы не ведутся',
                  },
                },
              ],
            ],
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
                  params: {},
                },
              ],
            ],
            params: {},
          },
        ],
      },
      settings: {},
    }

    expect(migration5.down(source)).toEqual(result)
  })
})
