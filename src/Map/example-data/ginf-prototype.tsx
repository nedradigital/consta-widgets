import React from 'react'

import { ChoiceGroup } from '@gpn-design/uikit/ChoiceGroup'
import { noop } from 'lodash'

import { GeoPoint, Map } from '../'

import css from './index.css'

const pointsEurope: readonly GeoPoint[] = [
  {
    name: 'ДО Иран',
    id: 'Iran',
    parentId: undefined,
    coords: [54.221233, 33.733982],
  },
  {
    name: 'ДО Тюмень',
    id: 'Tyumen',
    parentId: undefined,
    coords: [65.534328, 57.153033],
  },
  {
    name: 'ДО ЯНАО',
    id: 'Yamal',
    parentId: undefined,
    coords: [80.005397, 66.086435],
  },
  {
    name: 'ДО Спб',
    id: 'Spb',
    parentId: undefined,
    coords: [30.315868, 59.939095],
  },
  {
    name: 'ДО ХМАО',
    id: 'HMAO',
    parentId: undefined,
    coords: [65.897508, 61.588912],
  },
  {
    name: 'ДО Иркутск',
    id: 'Irk',
    parentId: undefined,
    coords: [104.281047, 52.287054],
  },
]
const pointsSouthAmerica: readonly GeoPoint[] = [
  {
    name: 'ДО Венесуэла',
    id: 'Venezuela',
    parentId: undefined,
    coords: [-65.441083, 6.494347],
  },
]

const dataByPoints = {
  Iran: {
    projects: ['Иранский проект 1', 'Иранский проект 2'],
  },
  Venezuela: {
    projects: ['Венесуэльский проект'],
  },
  Tyumen: {
    projects: ['Тюменский проект 1', 'Тюменский проект 2', 'Тюменский проект 3'],
  },
  Yamal: {
    projects: ['Единственный проект в ЯНАО'],
  },
  Spb: {
    projects: ['Спб-проект 1', 'Спб-проект 2'],
  },
  HMAO: {
    projects: [
      'Проект в ХМАО 1',
      'Проект в ХМАО 2',
      'Проект в ХМАО 3',
      'Проект в ХМАО 4',
      'Проект в ХМАО 5',
    ],
  },
  Irk: {
    projects: ['Иркутский проект'],
  },
}

type PointsType = {
  name: string
  points: readonly GeoPoint[]
}
const pointsTypes: readonly PointsType[] = [
  {
    name: 'Евразия',
    points: pointsEurope,
  },
  {
    name: 'Южная Америка',
    points: pointsSouthAmerica,
  },
]

export const GinfPrototype = () => {
  const [pointsType, setPointsType] = React.useState(pointsTypes[0])

  return (
    <div className={css.ginfWrapper}>
      <ChoiceGroup
        className={css.ginfSwitcher}
        size="m"
        items={[...pointsTypes]}
        getItemKey={item => item.name}
        getItemLabel={item => item.name}
        value={[pointsType]}
        onChange={({ value }) => value && setPointsType(value[0])}
      />
      <Map
        points={pointsType.points}
        padding={[50, 160]}
        selectedObjectId={undefined}
        onSelectedObjectIdChange={noop}
        renderPoint={point => {
          const pointData = dataByPoints[point.id as keyof typeof dataByPoints] || {
            projects: [],
          }
          const { projects } = pointData
          return (
            <div className={css.point}>
              {projects.length}
              <span className={css.pointText}>{point.name}</span>
              <select
                value={''}
                className={css.select}
                onChange={event => {
                  alert(`Выбран: ${event.target.value} (${point.name})`)
                }}
              >
                <option disabled selected value={''}>
                  Выберите:
                </option>
                <option value="all">Весь ДО</option>
                <optgroup label="Крупные проекты">
                  {projects.map((project: string) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          )
        }}
      />
    </div>
  )
}
