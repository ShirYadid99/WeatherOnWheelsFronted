// __tests__/PlaceService.test.ts
import { getPlaces } from '../services/PlaceService';

jest.mock('../services/PlaceService');  // נתעלם מהחיבור ל-API ונבצע mock לשירות

describe('PlaceService', () => {
  it('fetches places correctly', async () => {
    const mockPlaces = [
      { id: '1', name: 'Restaurant 1', type: 'Restaurant', address: 'Address 1' },
      { id: '2', name: 'Hotel 1', type: 'Hotel', address: 'Address 2' },
    ];
    (getPlaces as jest.Mock).mockResolvedValue(mockPlaces);

    const places = await getPlaces();
    expect(places).toEqual(mockPlaces);
    expect(places.length).toBeGreaterThan(0);
  });

  it('handles API errors correctly', async () => {
    (getPlaces as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    try {
      await getPlaces();
    } catch (error) {
      expect(error).toEqual(new Error('Failed to fetch'));
    }
  });
});
