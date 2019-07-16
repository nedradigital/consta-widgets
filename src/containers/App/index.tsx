import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import { classname } from '@/utils/classname';

import './styles.css';

const cn = classname('App');

export function App() {
  return <div className={cn()}>App</div>;
}

// tslint:disable-next-line:no-default-export
export default hot(App);
