import React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { blockCenteringDecorator } from '@/utils/Storybook';

import { ContractorInfo } from '.';

storiesOf('components/ContractorInfo', module)
  .addDecorator(withKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ContractorInfo
      phone={text('phone', '+7 915 000-00-00')}
      name={text('name', 'Супервайзер')}
      company={text('company', 'АО «Мессояханефтегаз»')}
    />
  ));
