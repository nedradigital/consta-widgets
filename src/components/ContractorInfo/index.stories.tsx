import React from 'react'

import { withSmartKnobs } from '@nekitk/storybook-addon-smart-knobs'
import { storiesOf } from '@storybook/react'

import { blockCenteringDecorator } from '@/utils/Storybook'

import { ContractorInfo } from '.'

storiesOf('components/ContractorInfo', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(blockCenteringDecorator())
  .add('interactive', () => (
    <ContractorInfo phone="7 915 000-00-00" name="Супервайзер" company="АО «Мессояханефтегаз»" />
  ))
