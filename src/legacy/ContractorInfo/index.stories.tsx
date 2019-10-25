import React from 'react'

import { storiesOf } from '@storybook/react'
import { withSmartKnobs } from 'storybook-addon-smart-knobs'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ContractorInfo } from '.'

storiesOf('legacy/ContractorInfo', module)
  .addDecorator(withSmartKnobs())
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ContractorInfo phone="7 915 000-00-00" name="Супервайзер" company="АО «Мессояханефтегаз»" />
  ))
