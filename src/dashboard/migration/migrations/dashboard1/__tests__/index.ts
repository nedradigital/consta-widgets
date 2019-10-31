import { Dashboard1, migration1 } from '../'
import { Dashboard0 } from '../../dashboard0'

const dashboard0Data: Dashboard0.State = {
  boxes: [],
  config: {},
}
const dashboard1Data: Dashboard1.State = {
  version: 1,
  boxes: [],
  config: {},
}

describe('migration1', () => {
  it('upgrades', () => {
    expect(migration1.up(dashboard0Data)).toEqual(dashboard1Data)
  })

  it('downgrades', () => {
    expect(migration1.down(dashboard1Data)).toEqual(dashboard0Data)
  })
})
