import React from 'react';
import { render } from '@testing-library/react';

import ActionPill from '../ActionPill';
import { Captains } from '../../../types';

test('renders an active ActionPill', () => {
  const { getByTestId } = render(<ActionPill captain={Captains.CAP_1} isActive={true} />);

  const el = getByTestId('actionPill');
  expect(el).toBeTruthy();
  expect(el).toHaveClass('pill captain1 active');
});

test('renders a deactive ActionPill', () => {
  const { getByTestId } = render(<ActionPill captain={Captains.CAP_2} isActive={false} />);

  const el = getByTestId('actionPill');
  expect(el).toBeTruthy();
  expect(el).toHaveClass('pill captain2');
});
