const apiUrl = 'https://localhost:44314/api/Place'; // כתובת ה-API של שרת המקומות

// פונקציה ליצירת מקום חדש
export const createPlace = async (place: { name: string, type: string, address: string }) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST', // שיטת הבקשה היא POST (לשלוח מידע לשרת)
      headers: {
        'Content-Type': 'application/json', // הכותרת מציינת שהמידע שנשלח הוא בפורמט JSON
      },
      body: JSON.stringify(place), // המרת הנתונים לפורמט JSON לשליחה ב-body של הבקשה
    });

    if (!response.ok) { // אם התשובה לא תקינה (קוד שגיאה 4xx/5xx)
      throw new Error('Failed to create place'); // זורקים שגיאה
    }

    return await response.json();  // מחזירים את הנתונים שהתקבלו מהשרת
  } catch (error) {
    console.error('Error creating place:', error); // הצגת שגיאה בקונסול
    throw error; // זורקים את השגיאה שוב
  }
};

// פונקציה להבאת רשימת המקומות
export const getPlaces = async () => {
  try {
    const response = await fetch(apiUrl); // ביצוע קריאה ל-API לקבלת רשימת מקומות

    if (!response.ok) { // אם התשובה לא תקינה
      throw new Error('Failed to fetch places'); // זורחים שגיאה
    }

    return await response.json();  // מחזירים את רשימת המקומות שהתקבלה מהשרת
  } catch (error) {
    console.error('Error fetching places:', error); // הצגת שגיאה בקונסול
    throw error; // זורחים את השגיאה שוב
  }
};
