import React from 'react';
import { render } from '@testing-library/react';
import { Captains } from '@icm/shared/types';

import ActionPill from '../ActionPill';

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
