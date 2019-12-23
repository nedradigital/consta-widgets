import { ChoiceGroup } from '@gpn-design/uikit'

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

const pointsTypes = {
  eu: {
    name: 'Евразия',
    points: pointsEurope,
  },
  sa: {
    name: 'Южная Америка',
    points: pointsSouthAmerica,
  },
} as const
type PointsType = keyof typeof pointsTypes

export const GinfPrototype = () => {
  const [pointsType, setPointsType] = React.useState<PointsType>('eu')
  const items = Object.keys(pointsTypes).map(type => ({
    value: type,
    label: pointsTypes[type as PointsType].name,
  }))
  const { points } = pointsTypes[pointsType]

  return (
    <div className={css.ginfWrapper}>
      <ChoiceGroup
        className={css.ginfSwitcher}
        items={items}
        wpSize="m"
        isMultiple={false}
        value={pointsType}
        onChange={newVal => newVal && setPointsType(newVal as PointsType)}
      />
      <Map
        points={points}
        padding={[50, 160]}
        selectedObjectId={undefined}
        onSelectedObjectIdChange={() => {}}
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
