import { getWidgetMockData } from '@/utils/widget-mock-data'
import { defaultParams as barChartDefaultParams } from '@/widgets/BarChartWidget'
import { defaultParams as buttonDefaultParams } from '@/widgets/ButtonWidget'
import { defaultParams as checkboxDefaultParams } from '@/widgets/CheckboxWidget'
import { defaultParams as choiceGroupDefaultParams } from '@/widgets/ChoiceGroupWidget'
import { defaultParams as datePickerDefaultParams } from '@/widgets/DatePickerWidget'
import { defaultParams as donutChartDefaultParams } from '@/widgets/DonutChartWidget'
import { defaultParams as imagesDefaultParams } from '@/widgets/ImagesWidget'
import { defaultParams as imageDefaultParams } from '@/widgets/ImageWidget'
import { defaultParams as legendDefaultParams } from '@/widgets/LegendWidget'
import { defaultParams as linearChartDefaultParams } from '@/widgets/LinearChartWidget'
import { defaultParams as mapDefaultParams } from '@/widgets/MapWidget'
import { defaultParams as multiBarChartDefaultParams } from '@/widgets/MultiBarChartWidget'
import { defaultParams as progressBarDefaultParams } from '@/widgets/ProgressBarWidget'
import { defaultParams as pyramidChartDefaultParams } from '@/widgets/PyramidChartWidget'
import { defaultParams as radarChartDefaultParams } from '@/widgets/RadarChartWidget'
import { defaultParams as roadmapDefaultParams } from '@/widgets/RoadmapWidget'
import { defaultParams as statsDefaultParams } from '@/widgets/StatsWidget'
import { defaultParams as tableLegendDefaultParams } from '@/widgets/TableLegendWidget'
import { defaultParams as textDefaultParams } from '@/widgets/TextWidget'
import { defaultParams as trafficLightDefaultParams } from '@/widgets/TrafficLightWidget'

import { SUPPORTED_DASHBOARD_VERSION } from './'
import { handleClear, storageName } from './index.stories'
import { CurrentDashboard, widgetIdsByType } from './migration/migrations/current'
import { Dataset, DataType } from './types'

export const exampleDatasets: readonly Dataset[] = [
  {
    name: 'Пример переключателя',
    type: DataType.Switch,
    id: 'switchExample',
  },
  {
    name: 'Барчарт вне группы',
    type: DataType.BarChart,
    id: 'barChartExample1',
  },
  {
    name: 'Барчарт в группе',
    type: DataType.BarChart,
    id: 'barChartExample2',
    groupName: 'Группа барчартов',
  },
  {
    name: 'Кнопка вне группы',
    type: DataType.Button,
    id: 'buttonExample1',
  },
  {
    name: 'Кнопка в группе',
    type: DataType.Button,
    id: 'buttonExample2',
    groupName: 'Группа кнопок',
  },
  {
    name: 'Чекбокс вне группы',
    type: DataType.Checkbox,
    id: 'checkboxExample1',
  },
  {
    name: 'Чекбокс в группе',
    type: DataType.Checkbox,
    id: 'checkboxExample2',
    groupName: 'Группа чекбоксов',
  },
  {
    name: 'Селект вне группы',
    type: DataType.ChoiceGroup,
    id: 'choiceGroupExample1',
  },
  {
    name: 'Селект в группе',
    type: DataType.ChoiceGroup,
    id: 'choiceGroupExample2',
    groupName: 'Группа селектов',
  },
  {
    name: 'Датапикер вне группы',
    type: DataType.DatePicker,
    id: 'datePickerExample1',
  },
  {
    name: 'Датапикер в группе',
    type: DataType.DatePicker,
    id: 'datePickerExample2',
    groupName: 'Группа датапикеров',
  },
  {
    name: 'Пончик вне группы',
    type: DataType.Donut,
    id: 'donutExample1',
  },
  {
    name: 'Пончик в группе',
    type: DataType.Donut,
    id: 'donutExample2',
    groupName: 'Группа пончиков',
  },
  {
    name: 'Изображение вне группы',
    type: DataType.Image,
    id: 'imageExample1',
  },
  {
    name: 'Изображение в группе',
    type: DataType.Image,
    id: 'imageExample2',
    groupName: 'Группа изображений',
  },
  {
    name: 'Изображения вне группы',
    type: DataType.Images,
    id: 'imagesExample1',
  },
  {
    name: 'Изображения в группе',
    type: DataType.Images,
    id: 'imagesExample2',
    groupName: 'Группа списков изображений',
  },
  {
    name: 'Легенда вне группы',
    type: DataType.Legend,
    id: 'legendExample1',
  },
  {
    name: 'Легенда в группе',
    type: DataType.Legend,
    id: 'legendExample2',
    groupName: 'Группа легенд',
  },
  {
    name: 'Линейный график вне группы',
    type: DataType.LinearChart,
    id: 'linearChartExample1',
  },
  {
    name: 'Линейный график в группе',
    type: DataType.LinearChart,
    id: 'linearChartExample2',
    groupName: 'Группа линейных графиков',
  },
  {
    name: 'Карта вне группы',
    type: DataType.Map,
    id: 'linearChartExample1',
  },
  {
    name: 'Карта в группе',
    type: DataType.Map,
    id: 'linearChartExample2',
    groupName: 'Группа карт',
  },
  {
    name: 'Мультибарчарт вне группы',
    type: DataType.MultiBarChart,
    id: 'multiBarChartExample1',
  },
  {
    name: 'Мультибарчарт в группе',
    type: DataType.MultiBarChart,
    id: 'multiBarChartExample2',
    groupName: 'Группа мультибарчартов',
  },
  {
    name: 'Прогрессбар вне группы',
    type: DataType.ProgressBar,
    id: 'progressBarExample1',
  },
  {
    name: 'Прогрессбар в группе',
    type: DataType.ProgressBar,
    id: 'progressBarExample2',
    groupName: 'Группа прогрессбаров',
  },
  {
    name: 'Пирамида вне группы',
    type: DataType.Pyramid,
    id: 'pyramidExample1',
  },
  {
    name: 'Пирамида в группе',
    type: DataType.Pyramid,
    id: 'pyramidExample2',
    groupName: 'Группа пирамид',
  },
  {
    name: 'Радар вне группы',
    type: DataType.RadarChart,
    id: 'radarExample1',
  },
  {
    name: 'Радар в группе',
    type: DataType.RadarChart,
    id: 'radarExample2',
    groupName: 'Группа радаров',
  },
  {
    name: 'Роадмап вне группы',
    type: DataType.Roadmap,
    id: 'roadmapExample1',
  },
  {
    name: 'Роадмап в группе',
    type: DataType.Roadmap,
    id: 'roadmapExample2',
    groupName: 'Группа роадмапов',
  },
  {
    name: 'Стата вне группы',
    type: DataType.Stats,
    id: 'statsExample1',
  },
  {
    name: 'Стата в группе',
    type: DataType.Stats,
    id: 'statsExample2',
    groupName: 'Группа стат',
  },
  {
    name: 'Таблица вне группы',
    type: DataType.TableLegend,
    id: 'tableLegendExample1',
  },
  {
    name: 'Таблица в группе',
    type: DataType.TableLegend,
    id: 'tableLegendExample2',
    groupName: 'Группа таблиц',
  },
  {
    name: 'Текст вне группы',
    type: DataType.Text,
    id: 'textExample1',
  },
  {
    name: 'Текст с тултипом',
    type: DataType.Text,
    id: 'textExample2',
    groupName: 'Группа текстов',
  },
  {
    name: 'Светофор вне группы',
    type: DataType.TrafficLight,
    id: 'trafficLightExample1',
  },
  {
    name: 'Светофор в группе',
    type: DataType.TrafficLight,
    id: 'trafficLightExample2',
    groupName: 'Группа светофоров',
  },
]

/* eslint-disable camelcase */
export const initialDashboardState: CurrentDashboard.State = {
  boxes: [{ w: 4, h: 1, x: 4, y: 0, i: 'Box_12', moved: false, static: false }],
  config: {
    Box_12: [
      {
        type: 'widget',
        debugName: 'Кнопка',
        id: '950e2e88-06e7-4429-86be-0a26dc93944e_2',
        widgetType: widgetIdsByType.ButtonWidget,
        params: {
          size: 'l',
          view: 'primary',
          width: 'auto',
          form: 'default',
          content: 'Заполнить демо-данными',
          growRatio: 1,
          datasetId: 'buttonExample2',
        },
      },
      {
        type: 'widget',
        debugName: 'Кнопка',
        id: '950e2e88-06e7-4429-86be-0a26dc93944e_1',
        widgetType: widgetIdsByType.ButtonWidget,
        params: {
          size: 'l',
          view: 'primary',
          width: 'auto',
          form: 'default',
          growRatio: 1,
          content: 'Сбросить',
        },
      },
    ],
  },
  settings: {},
  version: SUPPORTED_DASHBOARD_VERSION,
}

const exampleDashboardState: CurrentDashboard.State = {
  boxes: [
    { w: 6, h: 2, x: 0, y: 15, i: 'Box_0', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 15, i: 'Box_1', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 13, i: 'Box_2', moved: false, static: false },
    { w: 12, h: 1, x: 0, y: 1, i: 'Box_3', moved: false, static: false },
    { w: 12, h: 2, x: 0, y: 4, i: 'Box_4', moved: false, static: false },
    { w: 12, h: 2, x: 0, y: 11, i: 'Box_5', moved: false, static: false },
    { w: 6, h: 1, x: 0, y: 3, i: 'Box_6', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 2, i: 'Box_7', moved: false, static: false },
    { w: 12, h: 2, x: 0, y: 6, i: 'Box_8', moved: false, static: false },
    { w: 6, h: 1, x: 0, y: 2, i: 'Box_9', moved: false, static: false },
    { w: 12, h: 3, x: 0, y: 8, i: 'Box_10', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 13, i: 'Box_11', moved: false, static: false },
    { ...initialDashboardState.boxes[0] },
  ],
  config: {
    Box_0: [
      {
        type: 'widget',
        debugName: 'Барчарт',
        id: '1a8a7577-36e3-4fe6-a23e-244a51cd37c8_0',
        widgetType: widgetIdsByType.BarChartWidget,
        params: { ...barChartDefaultParams, growRatio: 1 },
      },
    ],
    Box_1: [
      {
        type: 'widget',
        debugName: 'МультиБарчарт',
        id: '653e4b44-2bac-4483-8366-ace725375a35_0',
        widgetType: widgetIdsByType.MultiBarChartWidget,
        params: { ...multiBarChartDefaultParams, growRatio: 1 },
      },
    ],
    Box_2: [
      {
        type: 'widget',
        debugName: 'Пончик',
        id: 'c7709106-fe0d-4e7c-bfce-2e5b88aa6d50_0',
        widgetType: widgetIdsByType.DonutChartWidget,
        params: { ...donutChartDefaultParams, growRatio: 1 },
      },
    ],
    Box_3: [
      {
        type: 'grid',
        grid: {
          items: [
            [
              [
                {
                  type: 'widget',
                  debugName: 'Текст',
                  id: 'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5_0',
                  widgetType: widgetIdsByType.TextWidget,
                  params: textDefaultParams,
                },
                {
                  type: 'widget',
                  debugName: 'Текст',
                  id: 'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5_1',
                  widgetType: widgetIdsByType.TextWidget,
                  params: textDefaultParams,
                },
                {
                  type: 'widget',
                  debugName: 'Прогресс-бар ("градусник")',
                  id: '944a8e67-5604-444f-afe0-f4a3263b734a_0',
                  widgetType: widgetIdsByType.ProgressBarWidget,
                  params: progressBarDefaultParams,
                },
              ],
              [
                {
                  type: 'widget',
                  debugName: 'Кнопка',
                  id: '950e2e88-06e7-4429-86be-0a26dc93944e_0',
                  widgetType: widgetIdsByType.ButtonWidget,
                  params: buttonDefaultParams,
                },
                {
                  type: 'widget',
                  debugName: 'Чекбокс',
                  id: '07645756-85d1-43da-b66c-10f96e5aff0b_0',
                  widgetType: widgetIdsByType.CheckboxWidget,
                  params: checkboxDefaultParams,
                },
                {
                  type: 'widget',
                  debugName: 'Choice Group',
                  id: '430768bb-be37-42b0-a1e7-57c6c1bebcea_0',
                  widgetType: widgetIdsByType.ChoiceGroupWidget,
                  params: choiceGroupDefaultParams,
                },
              ],
            ],
          ],
          columnParams: [{}, {}],
          rowParams: [{}],
        },
        params: {},
      },
    ],
    Box_4: [
      {
        id: '3cebeb3d-517a-410c-9434-c15835d30707_0',
        type: 'switch',
        displays: [
          [
            {
              type: 'widget',
              debugName: 'Картинки',
              id: 'd1a60ed1-96de-49b2-badd-052e0408d55a_0',
              widgetType: widgetIdsByType.ImagesWidget,
              params: imagesDefaultParams,
            },
            {
              type: 'widget',
              debugName: 'Картинка',
              id: '4cbc790b-7124-402f-8c7f-ec48b3403f74_0',
              widgetType: widgetIdsByType.ImageWidget,
              params: { ...imageDefaultParams, growRatio: 1 },
            },
          ],
          [
            {
              type: 'widget',
              debugName: 'Легенда',
              id: '2538ed91-7c6d-403e-9c3e-d68d3ecd8d00_0',
              widgetType: widgetIdsByType.LegendWidget,
              params: legendDefaultParams,
            },
          ],
        ],
        params: { growRatio: 1 },
      },
    ],
    Box_5: [
      {
        type: 'widget',
        debugName: 'Карта',
        id: '6d34ccb1-bfc6-4898-a520-7e3c8194a378_0',
        widgetType: widgetIdsByType.MapWidget,
        params: { ...mapDefaultParams, growRatio: 1 },
      },
    ],
    Box_6: [
      {
        type: 'widget',
        debugName: 'Фиксированная пирамида',
        id: '7adf7782-03cd-4452-bfc7-20f1c02d8eac_0',
        widgetType: widgetIdsByType.PyramidChartWidget,
        params: pyramidChartDefaultParams,
      },
    ],
    Box_7: [
      {
        type: 'widget',
        debugName: 'Радар',
        id: '94456b61-fba4-4121-a29c-a313cac4f4c0_0',
        widgetType: widgetIdsByType.RadarChartWidget,
        params: { ...radarChartDefaultParams, growRatio: 1 },
      },
    ],
    Box_8: [
      {
        type: 'widget',
        debugName: 'Роадмап',
        id: '3e85c9b1-2507-4dd0-955c-469a3f1919b5_0',
        widgetType: widgetIdsByType.RoadmapWidget,
        params: roadmapDefaultParams,
      },
    ],
    Box_9: [
      {
        type: 'widget',
        debugName: 'Выбор даты',
        id: 'f62a900b-99a2-4194-a277-eb58c49d68ff_0',
        widgetType: widgetIdsByType.DatePickerWidget,
        params: datePickerDefaultParams,
      },
      {
        type: 'widget',
        debugName: 'Светофор',
        id: 'fbeb7619-ae6b-4742-ae62-deea18e1382d_0',
        widgetType: widgetIdsByType.TrafficLightWidget,
        params: trafficLightDefaultParams,
      },
      {
        type: 'widget',
        debugName: 'Статы',
        id: '506fa3ba-e016-4b94-9ad3-547f7e70c464_0',
        widgetType: widgetIdsByType.StatsWidget,
        params: statsDefaultParams,
      },
    ],
    Box_10: [
      {
        type: 'widget',
        debugName: 'Таблица с легендой',
        id: '2f8f8f8e-21eb-4751-ab81-56ea11ac6342_0',
        widgetType: widgetIdsByType.TableLegendWidget,
        params: tableLegendDefaultParams,
      },
      {
        type: 'widget',
        debugName: 'Легенда',
        id: '2538ed91-7c6d-403e-9c3e-d68d3ecd8d00_1',
        widgetType: widgetIdsByType.LegendWidget,
        params: legendDefaultParams,
      },
    ],
    Box_11: [
      {
        type: 'widget',
        debugName: 'Линейный график',
        id: 'e63c468b-75bd-4c5c-95c7-696e598db6e3_0',
        widgetType: widgetIdsByType.LinearChartWidget,
        params: { ...linearChartDefaultParams, growRatio: 1 },
      },
    ],
    Box_12: [...initialDashboardState.config.Box_12],
  },
  settings: {},
  version: SUPPORTED_DASHBOARD_VERSION,
}
/* eslint-enable camelcase */

export const exampleDashboardData = {
  '950e2e88-06e7-4429-86be-0a26dc93944e_2': {
    content: 'Заполнить демо-данными',
    disabled: false,
    onClick: () => {
      localStorage.setItem(storageName, JSON.stringify(exampleDashboardState))
      location.reload()
    },
  },
  '950e2e88-06e7-4429-86be-0a26dc93944e_1': {
    content: 'Сбросить',
    disabled: false,
    onClick: handleClear,
  },
  '1a8a7577-36e3-4fe6-a23e-244a51cd37c8_0': getWidgetMockData(DataType.BarChart),
  '950e2e88-06e7-4429-86be-0a26dc93944e_0': getWidgetMockData(DataType.Button),
  '07645756-85d1-43da-b66c-10f96e5aff0b_0': getWidgetMockData(DataType.Checkbox),
  '430768bb-be37-42b0-a1e7-57c6c1bebcea_0': getWidgetMockData(DataType.ChoiceGroup),
  'f62a900b-99a2-4194-a277-eb58c49d68ff_0': getWidgetMockData(DataType.DatePicker),
  'c7709106-fe0d-4e7c-bfce-2e5b88aa6d50_0': getWidgetMockData(DataType.Donut),
  '4cbc790b-7124-402f-8c7f-ec48b3403f74_0': getWidgetMockData(DataType.Image),
  'd1a60ed1-96de-49b2-badd-052e0408d55a_0': getWidgetMockData(DataType.Images),
  '2538ed91-7c6d-403e-9c3e-d68d3ecd8d00_0': getWidgetMockData(DataType.Legend),
  '2538ed91-7c6d-403e-9c3e-d68d3ecd8d00_1': getWidgetMockData(DataType.Legend),
  'e63c468b-75bd-4c5c-95c7-696e598db6e3_0': getWidgetMockData(DataType.LinearChart),
  '6d34ccb1-bfc6-4898-a520-7e3c8194a378_0': getWidgetMockData(DataType.Map),
  '653e4b44-2bac-4483-8366-ace725375a35_0': getWidgetMockData(DataType.MultiBarChart),
  '944a8e67-5604-444f-afe0-f4a3263b734a_0': getWidgetMockData(DataType.ProgressBar),
  '7adf7782-03cd-4452-bfc7-20f1c02d8eac_0': getWidgetMockData(DataType.Pyramid),
  '94456b61-fba4-4121-a29c-a313cac4f4c0_0': getWidgetMockData(DataType.RadarChart),
  '3e85c9b1-2507-4dd0-955c-469a3f1919b5_0': getWidgetMockData(DataType.Roadmap),
  '506fa3ba-e016-4b94-9ad3-547f7e70c464_0': getWidgetMockData(DataType.Stats),
  '2f8f8f8e-21eb-4751-ab81-56ea11ac6342_0': getWidgetMockData(DataType.TableLegend),
  'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5_0': getWidgetMockData(DataType.Text),
  'b69b03e4-7fb6-4ac2-bdfa-e6c7fecdcca5_1': { text: 'Это текст без тултипа' },
  'fbeb7619-ae6b-4742-ae62-deea18e1382d_0': getWidgetMockData(DataType.TrafficLight),
}
