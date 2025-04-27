const apiUrl = 'https://localhost:44314/api/Place';

export const createPlace = async (place: { name: string, type: string, address: string }) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(place),
    });

    if (!response.ok) {
      throw new Error('Failed to create place');
    }

    return await response.json();  // מחזירים את הנתונים שהתקבלו מהשרת
  } catch (error) {
    console.error('Error creating place:', error);
    throw error;
  }
};

export const getPlaces = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }
    return await response.json();  // מחזירים את כל המקומות
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
};
