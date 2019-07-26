import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import { Constructor, DashboardState, DataType } from '@/components/Constructor';
import { classname } from '@/utils/classname';

import './styles.css';

const cn = classname('App');

let loaded = false;

export function App() {
  const [dashboard, setDashboard] = React.useState<DashboardState>({ widgets: [], layouts: {} });
  const [viewMode, setViewMode] = React.useState(false);

  React.useEffect(() => {
    const data = localStorage.getItem('data');
    const savedData = data && JSON.parse(data);

    if (savedData && !loaded) {
      setDashboard(savedData);
    }

    loaded = true;
  });

  if (loaded) {
    localStorage.setItem('data', JSON.stringify(dashboard));
  }

  return (
    <div className={cn()}>
      <Constructor
        margin={[15, 15]}
        datasets={[
          {
            name: 'График добычи нефти',
            type: DataType.Chart2D,
            data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
          },
          {
            name: 'Работа скважины',
            type: DataType.Chart2D,
            data: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
          },
          {
            name: 'Доля полезного продукта',
            type: DataType.PieChart,
            data: { a: 10, b: 20, c: 70 },
          },
        ]}
        cols={{ lg: 6, md: 5, sm: 4, xs: 4, xxs: 2 }}
        onChange={setDashboard}
        onClear={() => {
          localStorage.removeItem('data');
          location.reload();
        }}
        onToggleMode={() => setViewMode(!viewMode)}
        viewMode={viewMode}
        dashboard={dashboard}
      />
    </div>
  );
}

// tslint:disable-next-line:no-default-export
export default hot(App);
