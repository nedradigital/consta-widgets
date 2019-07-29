import React from 'react';

import { StoryDecorator } from '@storybook/react';

export const blockCenteringDecorator = (
  styles: React.CSSProperties = {}
): StoryDecorator => storyFn => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      minHeight: '100vh',
      maxWidth: '100%',
      width: '100%',
    }}
  >
    <div style={styles}>{storyFn()}</div>
  </div>
);

export const appDecorator: StoryDecorator = storyFn => (
  <div className="App" style={{ minHeight: '100vh' }}>
    {storyFn()}
  </div>
);
