import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { array, object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Constructor, DashboardState, DataType } from './';

storiesOf('components/Constructor', module)
  .addDecorator(withKnobs)
  .add('default constructor', () => {
    const margin = array('margin', [15, 15]) as [number, number];
    const datasets = [
      object('dataset1', {
        name: 'График добычи нефти',
        type: DataType.Chart2D,
        data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
      }),
      object('dataset2', {
        name: 'Работа скважины',
        type: DataType.Chart2D,
        data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
      }),
      object('dataset3', {
        name: 'Доля полезного продукта',
        type: DataType.PieChart,
        data: { a: 10, b: 20, c: 70 },
      }),
    ];
    const cols = object('cols', { lg: 6, md: 5, sm: 4, xs: 4, xxs: 2 });
    const dashboard = object('dashboard', { widgets: [], layouts: {} });

    return (
      <Constructor
        margin={margin}
        datasets={datasets}
        cols={cols}
        dashboard={dashboard}
        onChange={action('onChange')}
        onClear={action('onClear')}
        onToggleMode={action('onToggleMode')}
      />
    );
  })
  .add('with state', () => {
    const margin = array('margin', [15, 15]) as [number, number];
    const datasets = [
      object('dataset1', {
        name: 'График добычи нефти',
        type: DataType.Chart2D,
        data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
      }),
      object('dataset2', {
        name: 'Работа скважины',
        type: DataType.Chart2D,
        data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
      }),
      object('dataset3', {
        name: 'Доля полезного продукта',
        type: DataType.PieChart,
        data: { a: 10, b: 20, c: 70 },
      }),
    ];
    const cols = object('cols', { lg: 6, md: 5, sm: 4, xs: 4, xxs: 2 });

    function Wrapper() {
      const [dashboard, setDashboard] = React.useState<DashboardState>({
        widgets: [],
        layouts: {},
      });
      const [viewMode, setViewMode] = React.useState(false);

      return (
        <Constructor
          margin={margin}
          datasets={datasets}
          cols={cols}
          dashboard={dashboard}
          onChange={setDashboard}
          onClear={() => {
            localStorage.removeItem('data');
            location.reload();
          }}
          onToggleMode={() => setViewMode(!viewMode)}
          viewMode={viewMode}
        />
      );
    }

    return <Wrapper />;
  });
