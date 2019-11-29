import { ExtendedFeature } from 'd3'
import { Point, Polygon } from 'geojson'

export const WELL_POINTS: ReadonlyArray<ExtendedFeature<Point>> = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [39.891523, 59.220496],
    },
    properties: {
      name: 'Вологда',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [92.852572, 56.010563],
    },
    properties: {
      name: 'Красноярск',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [129.72998, 62.03363],
    },
    properties: {
      name: 'Якутск',
    },
  },
]

export const DEPOSITS: ReadonlyArray<ExtendedFeature<Polygon>> = [
  {
    type: 'Feature',
    id: 0,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [49.79398227148424, 63.3811751128771],
          [49.195227388671746, 62.59171261128299],
          [46.25089145117172, 64.85964196368579],
          [47.78897738867175, 62.41901713578489],
          [47.49234652929675, 62.03967009974842],
          [47.01993441992176, 62.42411074049158],
          [46.20694613867176, 61.88969883738856],
          [48.06363559179671, 61.000908559084735],
          [52.41422152929673, 60.23428751601913],
          [54.12808871679674, 62.38333755016174],
          [52.963537935546704, 64.51869708041045],
          [50.568518404296746, 62.61196384214614],
          [49.79398227148424, 63.3811751128771],
        ].reverse(),
      ],
    },
    properties: {
      name: 'Пример',
    },
  },
]
