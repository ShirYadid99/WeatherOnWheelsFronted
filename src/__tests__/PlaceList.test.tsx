// __tests__/PlaceList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PlaceList from '../components/PlaceList';

test('filters places by type', () => {
  const places = [
    { id: '1', name: 'Restaurant 1', type: 'Restaurant', latitude: 34.0522, longitude: -118.2437, address: '123 Main St', created_at: '2023-01-01' },
    { id: '2', name: 'Hotel 1', type: 'Hotel', latitude: 34.0522, longitude: -118.2437, address: '456 Elm St', created_at: '2023-01-02' },
    { id: '3', name: 'Park 1', type: 'Park', latitude: 34.0522, longitude: -118.2437, address: '789 Oak St', created_at: '2023-01-03' },
  ];

  render(<PlaceList places={places} onSelect={() => {}} selectedPlace={null} />);


  const select = screen.getByText('Filter by Type'); 

  // לחץ על ה-select כדי לפתוח את הרשימה
  fireEvent.change(select, { target: { value: 'Restaurant' } });

  // וודא שמסננים את המקומות לפי הסוג
  expect(screen.getByText('Restaurant 1')).toBeInTheDocument();
  expect(screen.queryByText('Hotel 1')).toBeNull();
  expect(screen.queryByText('Park 1')).toBeNull();
});