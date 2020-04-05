import React from 'react';
import '../../../fontAwesomeLibrary';
import { render } from '@testing-library/react';
import { Action, ActionObject, ActionScope, ActionType, ActionVisibility, Captains } from '@icm/shared/types';

import ActionPill from '../ActionPill';

const action: Action = {
  scope: ActionScope.GLOBAL,
  object: ActionObject.CIV,
  type: ActionType.PICK,
  visibility: ActionVisibility.VISIBLE,
  captain: Captains.CAP_1,
};

test('renders an active ActionPill', () => {
  const { getByTestId } = render(<ActionPill action={action} isActive={true} />);

  const el = getByTestId('actionPill');
  expect(el).toBeTruthy();
  expect(el).toHaveClass('pill active');
});

test('renders a deactive ActionPill', () => {
  const { getByTestId } = render(<ActionPill action={action} isActive={false} />);

  const el = getByTestId('actionPill');
  expect(el).toBeTruthy();
  expect(el).toHaveClass('pill');
});
