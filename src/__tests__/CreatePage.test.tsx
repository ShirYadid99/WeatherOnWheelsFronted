// __tests__/CreatePage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreatePage from '../pages/CreatePage';

test('renders CreatePage and submits form', async () => {
  render(<CreatePage />);

  const nameInput = screen.getByPlaceholderText(/name/i);
  const addressInput = screen.getByPlaceholderText(/address/i);
  const submitButton = screen.getByText(/create/i);

  fireEvent.change(nameInput, { target: { value: 'New Restaurant' } });
  fireEvent.change(addressInput, { target: { value: '123 Street' } });

  fireEvent.click(submitButton);

  expect(screen.getByText(/loading/i)).toBeInTheDocument(); // נוודא שהספינר מופיע
  // נוכל גם לבדוק שההודעה של הצלחה או שגיאה מופיעה
});
